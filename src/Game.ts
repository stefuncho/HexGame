import { Building, BuildingType, CellType } from "./model/Types.ts";
import { PillarsEmpty, ResourcesEmpty, satisfies } from "./model/Wallets.ts";
import { BuildingTypes, LoadMap, Policies, TradeTokens } from "./data/Dictionary.ts";
import { HexGame } from "./model/HexGame.ts";
import { PlayerState, PlayerResource } from './model/PlayerState.ts';
import { Cell, Nullable } from "./model/Types.ts"
import { CopyCell, ResourceType } from "./model/Types.ts";
import { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import { Card, DeckType, TechnologyCard } from "./model/Card.ts";
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

const scoreEmpire = (G : HexGame) => {
  let influece : { [ playerId : string ] : any } = {};
  let regionScore = {};

  for (let i = 0; i < G.cells.length; i++) {
    for (let cell of G.cells[i]) {
      if (!cell || !cell.building)
        continue;

      const ownerId = cell.building.ownerId;
      const regionId = cell.regionId;

      if (!influece[ownerId])
        influece[ownerId] = {};

      if (!influece[ownerId][regionId])
        influece[ownerId][regionId] = 0;

      influece[ownerId][regionId] += BuildingTypes[cell.building.type].influence;

      if (!regionScore[regionId])
        regionScore[regionId] = 0;

      regionScore[regionId] += BuildingTypes[cell.building.type].score;
    }
  }
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

    for (i = 0; i < DeckType.Count; i++) {
      for (j = 0; j < market[i].length; j++)
      {
        const card = deck[i].pop();
        if (card !== undefined)
          market[i][j] = card;
      }
    }

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
      market: market
    };
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  moves: {
    build: ({ G, playerID }, x, y, type) =>
    {
      const playerData = G.players[playerID];
      const newBuilding : Building = { type: type, ownerId: playerID };

      if (playerData.availableBuildings[type] <= 0)
        return INVALID_MOVE;

      if (!canBuild(G, [x, y], playerID, type))
        return INVALID_MOVE;

      const buildingData = BuildingTypes[type];

      if (!PlayerState.tryPay(playerData, buildingData.cost))
        return INVALID_MOVE;

      playerData.availableBuildings[type]--;
      playerData.buildings.push(newBuilding);
      (G.cells[x][y] as Cell).building = newBuilding;
      G.tariff += buildingData.tariffValue;
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

    breed: ({ G, playerID }) =>
    {
      const playerData = G.players[playerID];
      const cost = ResourcesEmpty.with(ResourceType.Food, 12);

      if (!PlayerState.tryPay(playerData, cost))
        return INVALID_MOVE;

      playerData.resources[ResourceType.Population].value += 2;
    },

    research: ({ G, playerID }, index : number) =>
    {
      const playerData = G.players[playerID];
      const cost = ResourcesEmpty.with(ResourceType.Idea, 5);
      const cardId = G.market[DeckType.Technology][index];

      if (cardId === undefined)
        return INVALID_MOVE;

      const card :TechnologyCard = cardDictionary[cardId];

      if (card.requirements !== undefined && !satisfies(playerData.pillars, card.requirements))
        return INVALID_MOVE;

      if (!PlayerState.tryPay(playerData, cost))
        return INVALID_MOVE;

      playerData.cards.push(cardId);
      G.market[DeckType.Technology][index] = undefined;
      card.onPlay && card.onPlay(G, playerID);
    },
  },
};