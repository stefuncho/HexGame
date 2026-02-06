import { Map, TradeTokes } from "./Dictionary.ts";
import "./Types.ts"

export const Hex = {
  setup: ({ random }) => 
  {
    var resources = [];

    for (var i = 0; i < TradeTokes.length; i++)
      for (var j = 0; j < 5; j++)
        resources.push(i);

    for (i = resources.length; i < 170; i++)
      resources.push(-1);

    random.Shuffle(resources);
      
      console.log("resources");

    return { cells: Map, resources: resources };
  },

  moves: {
    init: ({ random, G }) =>
    {
      random.Shuffle(G.resources);
      
      for (var i = 0; i < G.cells.length; i++)
      {
        for (var j = 0; j < G.cells[i].length; j++)
        {
          if (G.cells[i][j] === null)
            continue;

          var resourceId = G.resources.pop();

          if (resourceId < 0)
            continue;

          G.cells[i][j].resourceId = resourceId;
        }
      }
    },
    clickCell: ({ G, playerID }, id) =>
    {
      G.cells[id] = playerID;
    },
  },
};