import { Map, TradeTokes } from "./model/Dictionary.ts";
import "./model/Types.ts"
import { CopyCell, ResourceType } from "./model/Types.ts";

export const Hex = {
  setup: ({ random, ctx }) => 
  {
    var tokens = [];
    var map = Map;

    for (var i = 0; i < TradeTokes.length; i++)
      for (var j = 0; j < 5; j++)
        tokens.push(i);

    for (i = tokens.length; i < 170; i++)
      tokens.push(-1);

    tokens = random.Shuffle(tokens);

    var cells = [];
    
    for (i = 0; i < map.length; i++)
    {
      cells.push([]);

      for (j = 0; j < map[i].length; j++)
      {
        var cell = map[i][j] ? CopyCell(map[i][j]) : null;

        cells[i].push(cell);

        if (cell === null)
          continue;

        var resourceId = tokens.pop();

        if (resourceId < 0)
          continue;

        cell.resourceId = resourceId;
      }
    }
    
    //console.log(cells);

    var players = [];

    for (i = 0; i < 1; i++)
    {
      var resources = [];

      for (j = 0; j < ResourceType.Count; j++)
      {
        resources.push({ value: 0, production: 0 });
      }

      players["0"] = { 
        resources: resources,
        population: 5,
        goods: [],
        buildings: [],
      };

    }

    return { cells: cells, players: players };
  },

  moves: {
    build: ({ G, playerID }, x, y, type) =>
    {
      const newBuilding = { type: type, owner: playerID };

      G.players[playerID].buildings.push(newBuilding);
      G.cells[x][y].building = newBuilding;
    },
    produce: ({ G, playerID }, type) =>
    {
      const playerData = G.players[playerID];
      const playerResources = playerData.resources[type];

      playerResources.value
        += playerResources.production 
          + playerData.population;
    },
  },
};