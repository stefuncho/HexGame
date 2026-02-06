import { Nullable, Cell, CreateCell } from "./Types.ts"

export const Map = await fetch("board.map")
  .then((res) => res.text())
  .then((text) =>
  {
    var board : Nullable<Cell>[][] = Array<Array<Nullable<Cell>>>(25).fill([])
      .map(_ => Array<Nullable<Cell>>(14).fill(null));

    var id = 0;

    text.split("\n").forEach(
      cellData => 
      {
        if (cellData.length < 4 || cellData[0] === '\\' || cellData[0] === '/')
          return;

        var cell = cellData.split(' ').map((a, _b, _c) => Number.parseInt(a));
        board[cell[0]][cell[1]] = CreateCell(id++, cell[2]);
      }
    );
    return board;
  })
  .catch((e) => console.error(e));

export const BuildingType = 
{
  CITY: 0,
  PORT: 1,
  FARM: 2,
  WORKSHOP: 3,
};

export const TradeTokes = 
[
  {
    id: 0,
    image: "StrategyGameIcons/Apple.png",
  },
  {
    id: 1,
    image: "StrategyGameIcons/Bananas.png",
  },
  {
    id: 2,
    image: "StrategyGameIcons/Barrel.png",
  },
  {
    id: 3,
    image: "StrategyGameIcons/Bluecloth.png",
  },
  {
    id: 4,
    image: "StrategyGameIcons/Bottle.png",
  },
  {
    id: 5,
    image: "StrategyGameIcons/Bottle2.png",
  },
  {
    id: 6,
    image: "StrategyGameIcons/Bricks.png",
  },
  {
    id: 7,
    image: "StrategyGameIcons/BronzeBars.png",
  },
  {
    id: 8,
    image: "StrategyGameIcons/China.png",
  },
  {
    id: 9,
    image: "StrategyGameIcons/Citrus.png",
  },
  {
    id: 10,
    image: "StrategyGameIcons/Cloves.png",
  },
  {
    id: 11,
    image: "StrategyGameIcons/CopperIngots.png",
  },
  {
    id: 12,
    image: "StrategyGameIcons/Cow.png",
  },
  {
    id: 13,
    image: "StrategyGameIcons/Deer.png",
  },
  {
    id: 14,
    image: "StrategyGameIcons/Donkey.png",
  },
];