import { Building, BuildingType } from "./model/Types.ts";
import { LoadMap, Policies, TradeTokes } from "./data/Dictionary.ts";
import { HexGame } from "./model/HexGame.ts";
import { PlayerState, PlayerResource } from './model/PlayerState.ts';
import { PillarsExt } from "./model/Pillars.ts";
import { Cell, Nullable } from "./model/Types.ts"
import { CopyCell, ResourceType } from "./model/Types.ts";
import { Game } from "boardgame.io";

export const Hex : Game<HexGame> = {
  setup: ({ random, ctx }) => 
  {
    var tokens : number[] = [];
    var map = LoadMap() as Nullable<Cell>[][];

    for (var i = 0; i < TradeTokes.length; i++)
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
    
    //console.log(cells);

    var players : { [ playerID : string ] : PlayerState } = {};

    for (i = 0; i < ctx.numPlayers; i++)
    {
      var resources : PlayerResource[] = [];

      for (j = 0; j < ResourceType.Count; j++)
      {
        resources.push({ value: 0, production: 0 });
      }

      players[i] = {
        points: 0,
        resources: resources,
        population: 5,
        pillars: PillarsExt.create(),
        goods: [],
        buildings: [],
        policy: null,
        policyPower: false,
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

    return { cells: cells, players: players };
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
        return;

      playerData.availableBuildings[type]--;
      playerData.buildings.push(newBuilding);
      (G.cells[x][y] as Cell).building = newBuilding;
    },
    
    produce: ({ G, playerID }, type) =>
    {
      const playerData = G.players[playerID];
      const playerResources = playerData.resources[type];

      playerResources.value
        += playerResources.production 
          + playerData.population;
    },

    introducePolicy: ({ G, playerID }, type) =>
    {
      const playerData = G.players[playerID];
      const policy = Policies[type];

      if (!PillarsExt.satisfies(playerData.pillars, policy.req))
        return;

      if (playerData.resources[ResourceType.Idea].value < policy.cost)
        return;

      playerData.resources[ResourceType.Idea].value -= policy.cost;

      playerData.policy = policy.type;
      playerData.policyPower = true;
    },
  },
};