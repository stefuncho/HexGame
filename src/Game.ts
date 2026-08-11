import { Building, BuildingType, CellType, PillarType } from "./model/Types.ts";
import { PillarsEmpty, ResourcesEmpty, satisfies } from "./model/Wallets.ts";
import { BuildingTypes, LoadMap, Policies, RegionCount, TradeTokens } from "./data/Dictionary.ts";
import { HexGame, Scoreboard } from "./model/HexGame.ts";
import { PlayerState, PlayerResource } from './model/PlayerState.ts';
import { Cell, Nullable } from "./model/Types.ts"
import { CopyCell, ResourceType } from "./model/Types.ts";
import { Ctx, Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { BuildingCard, Card, DeckType, PopulationCard, ProjectCard, TechnologyCard } from "./model/Card.ts";
import { cardDictionary } from "./data/CardDictionary.ts";

export const canBuild = (G: HexGame, cellPos: number[], playerId: string, buildingType: BuildingType) =>
{
  const cell = G.cells[cellPos[0]][cellPos[1]];

  if (cell.building !== undefined)
    return false;

  if (cell.type === CellType.Port && buildingType !== BuildingType.Port)
    return false;

  if (cell.type !== CellType.Port && buildingType === BuildingType.Port)
    return false;

  if (buildingType !== BuildingType.Farm && buildingType !== BuildingType.Workshop)
    return true;

  for (var i = -1; i < 2; i++)
  {
    const x = cellPos[0] + i;
    if (x < 0 || x >= G.cells.length)
      continue;

    var row = G.cells[x];

    for (var j = (!i ? -1 : -x%2); j < 2 + (!i ? 0 : -x%2); j++)
    {
      const y = cellPos[1] + j ;

      if (y < 0 || y >= row.length || row[y] === null)
        continue;

      if (row[y].building !== undefined
        && row[y].building.ownerId === playerId)
        return true;
    }
  }

  return false;
}

const playCard = (G : HexGame, playerID : string, deck : DeckType, index: number) => {
  const cardId = G.market[deck][index];
  const card = cardDictionary[cardId];

  G.market[deck][index] = undefined;
  G.players[playerID].cards.push(cardId);
  card.onPlay && card.onPlay(G, playerID);
}

const pushMarket = (market : string[][]) => {

    for (var i = 0; i < DeckType.Count; i++) {
      for (var j = 0; j < market[i].length; j++)
        for (var k = 0; k < j; k++)
        {
          if (market[i][k] !== undefined)
            continue;

          market[i][k] = market[i][k + 1];
          market[i][k + 1] = undefined;
        }
    }
}

const refillMarket = (deck : string[][], market : string[][]) => {

    for (var i = 0; i < DeckType.Count; i++) {
      for (var j = 0; j < market[i].length; j++)
      {
        if (market[i][j] !== undefined)
          continue;

        const card = deck[i].pop();
        if (card !== undefined)
          market[i][j] = card;
      }
    }
}

const scoreEmpire = (G : HexGame, ctx: Ctx) => {
  const influence : number[][] = Array(ctx.numPlayers);
  const regionScore : {[key: number]: number} = {};
  const scoreboard : Scoreboard = {
    influenceByPlayerByRegion: influence,
    scoreByPlayerByRegion: Array.from({ length: ctx.numPlayers}, () => Array(RegionCount)),
    policyScoreByPlayer: Array(ctx.numPlayers),
  };

  for (let i = 0; i < G.cells.length; i++) {
    for (let cell of G.cells[i]) {
      if (!cell || !cell.building)
        continue;

      const ownerId = Number.parseInt(cell.building.ownerId);
      const regionId = cell.regionId;

      if (!influence[ownerId])
        influence[ownerId] = Array(RegionCount);

      if (!influence[ownerId][regionId])
        influence[ownerId][regionId] = 0;

      influence[ownerId][regionId] += BuildingTypes[cell.building.type].influence;

      if (regionScore[regionId] === undefined)
        regionScore[regionId] = 0;

      regionScore[regionId] += BuildingTypes[cell.building.type].score;
    }
  }

  for (let i = 0; i < RegionCount; i++) {
    const regionInfluence : Array<{ids: Array<number>, influence: number}>
        = influence.reduce((acc : Array<{ids: Array<number>, influence: number}>, currentValue, currentIndex) => {
      const currentInfluence = currentValue?.[i] ?? 0;

      for (let j=0; j < acc.length; j++)
      {
        if (currentInfluence > acc[j].influence)
        {
          acc.splice(j, 0, {ids: [currentIndex], influence: currentInfluence});
          return acc;
        }
        else if (currentInfluence === acc[j].influence)
        {
          acc[j].ids.push(currentIndex);
          return acc;
        }
      }

      acc.push({ids: [currentIndex], influence: currentInfluence});
      return acc;
    }, []);

    if (regionInfluence[0].influence > 0) {
      regionInfluence[0].ids.forEach(pid => {
        const playerScore = regionScore[i] + 3;
        G.players[pid].points += playerScore;
        scoreboard.scoreByPlayerByRegion[pid][i] = playerScore;
      });
    }

    if (regionInfluence.length > 1 && regionInfluence[1].influence > 0
      && regionInfluence[1].ids.length === 1
    ) {
        const pid = regionInfluence[1].ids[0];
        G.players[pid].points += 2;
        scoreboard.scoreByPlayerByRegion[pid][i] = 2;
    }
  }

  for (let i = 0; i < ctx.numPlayers; i++) {
    const policy = G.players[i].policy;
    if (policy) {
      var policyScore = Policies[policy].score(G, i);
      G.players[i].points += policyScore;
      scoreboard.policyScoreByPlayer[i] = policyScore;
    }
  }

  G.scoreboard.push(scoreboard);
}

export const Hex : Game<HexGame> = {
  setup: ({ random, ctx }) =>
  {
    var tokens : number[] = [];
    var map = LoadMap() as Nullable<Cell>[][];

    for (var i = 0; i < TradeTokens.length; i++)
      for (var j = 0; j < 5; j++)
        tokens.push(i);

    for (i = tokens.length; i < 170; i++)
      tokens.push(-1);

    tokens = random.Shuffle(tokens);

    var cells : Nullable<Cell>[][] = [];

    for (i = 0; i < map.length; i++)
    {
      cells.push([]);

      for (j = 0; j < map[i].length; j++)
      {
        var cell = map[i][j] ? CopyCell(map[i][j] as Cell) : null;

        cells[i].push(cell);

        if (cell === null)
          continue;

        var resourceId = tokens.pop() as number;

        if (resourceId < 0)
          continue;

        cell.resourceId = resourceId;
      }
    }

    const deck : string[][] = Array(DeckType.Count);
    const market : string[][] = Array(DeckType.Count);

    for (i = 0; i < DeckType.Count; i++) {
      deck[i] = [];
    }

    market[DeckType.Technology] = Array(5);
    market[DeckType.Build] = Array(5);
    market[DeckType.Population] = Array(2);
    market[DeckType.Tariff] = Array(2);

    Object.keys(cardDictionary).forEach((key) => {
      const card : Card = cardDictionary[key];
      deck[card.deck].push(key);
    });

    for (i = 0; i < DeckType.Count; i++)
      deck[i] = random.Shuffle(deck[i]);

    refillMarket(deck, market);

    var players : { [ playerID : string ] : PlayerState } = {};

    for (i = 0; i < ctx.numPlayers; i++)
    {
      var resources : PlayerResource[] = [];

      for (j = 0; j < ResourceType.Count; j++)
      {
        resources.push({ value: 0, production: 0 });
      }

      resources[ResourceType.Population].value = 5;

      players[i] = {
        points: 0,
        resources: resources,
        pillars: [...PillarsEmpty],
        goods: [],
        buildings: [],
        cards: [],
        policy: null,
        policyPower: false,
        tariffProduction: 0,
        taxProduction: 0,
        unrest: 0,
        availableBuildings:
        {
          [BuildingType.City] : 12,
          [BuildingType.Port] : 3,
          [BuildingType.Farm] : 6,
          [BuildingType.Workshop] : 6,
          [BuildingType.Wonder] : 0,
        }
      };
    }

    return {
      cells: cells,
      players: players,
      tariff: 0,
      deck: deck,
      market: market,
      scoreboard: [],
    };
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
    onEnd: ({ G, ctx }) =>
    {
      pushMarket(G.market);
      refillMarket(G.deck, G.market);
    }
  },

  moves: {
    build: ({ G, playerID }, x, y, type : BuildingType, cardIndex? : number) =>
    {
      const playerData = G.players[playerID];

      if (playerData.availableBuildings[type] <= 0)
        return INVALID_MOVE;

      if (!canBuild(G, [x, y], playerID, type))
        return INVALID_MOVE;

      const buildingData = BuildingTypes[type];

      let card : BuildingCard;

      if (cardIndex) {
        const cardId = G.market[DeckType.Build][cardIndex];

        if (cardId === undefined)
          return INVALID_MOVE;

        card = cardDictionary[cardId] as BuildingCard;

        if (card.type !== type)
          return INVALID_MOVE;
      }

      if (!PlayerState.tryPay(playerData, buildingData.cost))
        return INVALID_MOVE;

      const newBuilding : Building = { type: type, ownerId: playerID };

      playerData.availableBuildings[type]--;
      playerData.buildings.push(newBuilding);
      (G.cells[x][y] as Cell).building = newBuilding;
      G.tariff += buildingData.tariffValue;

      if (cardIndex)
        playCard(G, playerID, DeckType.Build, cardIndex);
    },

    produce: ({ G, playerID }, type) =>
    {
      const playerData = G.players[playerID];
      const playerResources = playerData.resources[type];

      playerResources.value
        += playerResources.production
          + playerData.resources[ResourceType.Population].value;
    },

    introducePolicy: ({ G, playerID }, type) =>
    {
      const playerData = G.players[playerID];
      const policy = Policies[type];

      if (!satisfies(playerData.pillars, policy.req))
        return INVALID_MOVE;

      const cost = ResourcesEmpty.with(ResourceType.Idea, policy.cost);

      if (!PlayerState.tryPay(playerData, cost))
        return INVALID_MOVE;

      playerData.policy = policy.type;
      playerData.policyPower = true;
    },

    playTariffCard: ({ G, playerID }, cardIndex : number) =>
    {
      const cardId = G.market[DeckType.Tariff][cardIndex];
      if (cardId === undefined)
        return INVALID_MOVE;

      playCard(G, playerID, DeckType.Tariff, cardIndex);
    },

    tariff: ({ G, playerID }, isTax : boolean) =>
    {
      const playerData = G.players[playerID];

      if (!G.market[DeckType.Tariff].every(x => !x))
        return INVALID_MOVE;

      if (isTax)
        playerData.resources[ResourceType.Money].value
          += playerData.pillars[PillarType.Government]
            + playerData.resources[ResourceType.Population].value
            + playerData.tariffProduction;
      else
        playerData.resources[ResourceType.Money].value
          += PlayerState.getCities(playerData).length
            + playerData.goods.length
            + playerData.tariffProduction;
    },

    breed: ({ G, playerID }, cardIndex? : number) =>
    {
      const playerData = G.players[playerID];
      let card : PopulationCard;

      if (cardIndex !== undefined) {
        const cardId = G.market[DeckType.Population][cardIndex];

        if (cardId === undefined)
          return INVALID_MOVE;

        card = cardDictionary[cardId] as PopulationCard;
      }
      else if (!G.market[DeckType.Population].every(x => !x))
        return INVALID_MOVE;

      const cost = ResourcesEmpty.with(ResourceType.Food, card ? card.foodCost : 12);

      if (!PlayerState.tryPay(playerData, cost))
        return INVALID_MOVE;

      if (card)
        playCard(G, playerID, DeckType.Population, cardIndex);
      else
        playerData.resources[ResourceType.Population].value += 2;
    },

    research: ({ G, playerID }, index : number) =>
    {
      const playerData = G.players[playerID];
      const cost = ResourcesEmpty.with(ResourceType.Idea, 5);
      const cardId = G.market[DeckType.Technology][index];

      if (cardId === undefined)
        return INVALID_MOVE;

      const card : TechnologyCard = cardDictionary[cardId] as TechnologyCard;

      if (card.requirements !== undefined && !satisfies(playerData.pillars, card.requirements))
        return INVALID_MOVE;

      if (!PlayerState.tryPay(playerData, cost))
        return INVALID_MOVE;

      playCard(G, playerID, DeckType.Technology, index);
    },

    buildProject: ({ G, playerID }, index : number) =>
    {
      const playerData = G.players[playerID];
      const cardId = G.market[DeckType.Build][index];

      if (cardId === undefined)
        return INVALID_MOVE;

      const card : ProjectCard = cardDictionary[cardId] as ProjectCard;

      if (card.requirements !== undefined && !satisfies(playerData.pillars, card.requirements))
        return INVALID_MOVE;

      if (!PlayerState.tryPay(playerData, card.cost))
        return INVALID_MOVE;

      playCard(G, playerID, DeckType.Build, index);
    },

    score: ({ G, ctx }) => scoreEmpire(G, ctx),
  },
};
