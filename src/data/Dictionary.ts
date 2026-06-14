import { PlayerState } from "../model/PlayerState.ts";
import { Nullable, Cell, CreateCell, Policy, PolicyType, PillarType, BuildingType, ResourceType, BuildingData } from "../model/Types.ts"
import { PillarsEmpty, ResourcesEmpty } from "../model/Wallets.ts";
import { Map } from "./Resources.mjs"

export const RegionCount = 7;

export function LoadMap()
{
  var board : Nullable<Cell>[][] = Array<Array<Nullable<Cell>>>(25).fill([])
    .map(_ => Array<Nullable<Cell>>(14).fill(null));

  var id = 0;

  (Map as string).split("\n").forEach(
    cellData =>
    {
      if (cellData.length < 4 || cellData[0] === '\\' || cellData[0] === '/')
        return;

      var cellCoords = cellData.split(' ').map((a, _b, _c) => Number.parseInt(a));
      const row = cellCoords[0] ?? 0;
      const col = cellCoords[1] ?? 0;
      if (board[row]) {
        board[row][col] = CreateCell(id++, cellCoords[2] ?? 0);
      }
    }
  );
  return board;
}

export const PlayerInfo : Record<string, { id: number; filter: string; title: string }> =
{
  "0": {
    id: 0,
    filter: "invert(10%) sepia(75%) saturate(6696%) hue-rotate(1deg) brightness(100%) contrast(115%)",
    title: "Rzymu"
  },
  "1": {
    id: 1,
    filter: "invert(10%) sepia(100%) saturate(6171%) hue-rotate(238deg) brightness(89%) contrast(92%)",
    title: "Grecji"
  },
  "2": {
    id: 2,
    filter: "invert(10%) sepia(55%) saturate(2918%) hue-rotate(13deg) brightness(100%) contrast(106%)",
    title: "Egiptu"
  },
  "3": {
    id: 3,
    filter: "invert(10%) sepia(39%) saturate(5551%) hue-rotate(87deg) brightness(110%) contrast(117%)",
    title: "Galii"
  },
  "4": {
    id: 4,
    filter: "invert(10%) sepia(0%) saturate(0%) hue-rotate(236deg) brightness(93%) contrast(83%)",
    title: "Kartaginy"
  },
  "5": {
    id: 5,
    filter: "invert(10%) sepia(49%) saturate(5104%) hue-rotate(288deg) brightness(103%) contrast(128%)",
    title: "Asyrii"
  },
};

export const TradeTokens =
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

export const BuildingTypes : BuildingData[] =
[
  {
    id: 0,
    image: "building-icons/City.png",
    title: "Miasto",
    cost: ResourcesEmpty.with(ResourceType.Population, 2).with(ResourceType.Stone, 4),
    score: 1,
    influence: 2,
    tariffValue: 5,
  },
  {
    id: 1,
    image: "building-icons/Port.png",
    title: "Port",
    cost: ResourcesEmpty.with(ResourceType.Population, 2).with(ResourceType.Stone, 4),
    score: 1,
    influence: 2,
    tariffValue: 10,
  },
  {
    id: 2,
    image: "building-icons/Wonder.png",
    title: "Farma",
    cost: ResourcesEmpty,
    score: 0,
    influence: 1,
    tariffValue: 0,
  },
  {
    id: 3,
    image: "building-icons/Wonder.png",
    title: "Warsztat",
    cost: ResourcesEmpty,
    score: 0,
    influence: 1,
    tariffValue: 0,
  },
  {
    id: 4,
    image: "building-icons/Wonder.png",
    title: "Cud",
    cost: ResourcesEmpty,
    score: 1,
    influence: 2,
    tariffValue: 0,
  },
];

export const Policies : Array<Policy> =
[
  {
    type: PolicyType.CityState,
    req: PillarsEmpty
      .with(PillarType.Government, 2)
      .with(PillarType.Population, 1),
    cost: 15,
    score: (G, playerID) => {
        const player = G.players[playerID] as PlayerState;
        return player.buildings.length;
      },
  },
  {
    type: PolicyType.Monarchy,
    req: PillarsEmpty
      .with(PillarType.Government, 2)
      .with(PillarType.Food, 1),
    cost: 15,
    score: (G, playerID) => {
        const player = G.players[playerID] as PlayerState;
        return player?.buildings.filter(b => b.type === BuildingType.Wonder).length;
      },
  },
  {
    type: PolicyType.Oligarchy,
    req: PillarsEmpty
      .with(PillarType.Government, 2)
      .with(PillarType.Economic, 1),
    cost: 15,
    score: (G, playerID) => {
        return 0; // TODO 1/2(4+ players) pt for every Golden Age or Achievement
      },
  },
  {
    type: PolicyType.Republic,
    req: PillarsEmpty
      .with(PillarType.Government, 3)
      .with(PillarType.Culture, 1),
    cost: 20,
    score: (G, playerID) => {
        const player = G.players[playerID] as PlayerState;
        return Math.floor(player.resources[ResourceType.Population]?.value ?? 0 / 2);
      },
  },
  {
    type: PolicyType.Theocracy,
    req: PillarsEmpty
      .with(PillarType.Government, 2)
      .with(PillarType.Military, 1),
    cost: 15,
    score: (G, playerID) => {
        const player = G.players[playerID] as PlayerState;
        return player.buildings.length;
      },
  },
  {
    type: PolicyType.Tyranny,
    req: PillarsEmpty
      .with(PillarType.Military, 2),
    cost: 5,
    score: (G, playerID) => {
        return 0; // TODO: 2/3(4+ players) pts for each controlled region
      },
  },
]