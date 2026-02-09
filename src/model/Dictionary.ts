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

export const PlayerInfo = 
[
  {
    id: 0,
    filter: "invert(10%) sepia(75%) saturate(6696%) hue-rotate(1deg) brightness(100%) contrast(115%)",
    title: "Rzymu"
  },
  {
    id: 1,
    filter: "invert(10%) sepia(100%) saturate(6171%) hue-rotate(238deg) brightness(89%) contrast(92%)",
    title: "Grecji"
  },
  {
    id: 2,
    filter: "invert(10%) sepia(55%) saturate(2918%) hue-rotate(13deg) brightness(100%) contrast(106%)",
    title: "Egiptu"
  },
  {
    id: 3,
    filter: "invert(10%) sepia(39%) saturate(5551%) hue-rotate(87deg) brightness(110%) contrast(117%)",
    title: "Galii"
  },
  {
    id: 4,
    filter: "invert(10%) sepia(0%) saturate(0%) hue-rotate(236deg) brightness(93%) contrast(83%)",
    title: "Kartaginy"
  },
  {
    id: 5,
    filter: "invert(10%) sepia(49%) saturate(5104%) hue-rotate(288deg) brightness(103%) contrast(128%)",
    title: "Asyrii"
  },
];

export const TradeTokes = 
[
  {
    id: 0,
    image: "StrategyGameIcons/Apple.png",
    title: "Jabłko"
  },
  {
    id: 1,
    image: "StrategyGameIcons/Bananas.png",
    title: "Banan"
  },
  {
    id: 2,
    image: "StrategyGameIcons/Barrel.png",
    title: "Whisky"
  },
  {
    id: 3,
    image: "StrategyGameIcons/Bluecloth.png",
    title: "Płótno"
  },
  {
    id: 4,
    image: "StrategyGameIcons/Bottle.png",
    title: "Amol"
  },
  {
    id: 5,
    image: "StrategyGameIcons/Bottle2.png",
    title: "Cydr"
  },
  {
    id: 6,
    image: "StrategyGameIcons/Bricks.png",
    title: "Glina"
  },
  {
    id: 7,
    image: "StrategyGameIcons/BronzeBars.png",
    title: "Brąz"
  },
  {
    id: 8,
    image: "StrategyGameIcons/China.png",
    title: "Porcelana"
  },
  {
    id: 9,
    image: "StrategyGameIcons/Citrus.png",
    title: "Cytryna"
  },
  {
    id: 10,
    image: "StrategyGameIcons/Cloves.png",
    title: "Goździki"
  },
  {
    id: 11,
    image: "StrategyGameIcons/CopperIngots.png",
    title: "Miedź"
  },
  {
    id: 12,
    image: "StrategyGameIcons/Cow.png",
    title: "Krowa"
  },
  {
    id: 13,
    image: "StrategyGameIcons/Deer.png",
    title: "Jeleń"
  },
  {
    id: 14,
    image: "StrategyGameIcons/Donkey.png",
    title: "Osioł"
  },
];

export const BuildingTypes = 
[
  {
    id: 0,
    image: "building-icons/City.png",
    title: "Miasto"
  },
  {
    id: 1,
    image: "building-icons/Port.png",
    title: "Port"
  },
  {
    id: 2,
    image: "building-icons/Wonder.png",
    title: "Farma"
  },
  {
    id: 3,
    image: "building-icons/Wonder.png",
    title: "Warsztat"
  },
  {
    id: 4,
    image: "building-icons/Wonder.png",
    title: "Cud"
  },
];