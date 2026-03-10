import { Building } from "./Building.ts"
import { HexGame } from "./HexGame.ts";
export * from "./Pillars.ts"
export * from "./Building.ts"

export * from "./Policy.ts"

export type Nullable<T> = T | null;

export type EnumDictionary<T extends string | symbol | number, U> = {
    [K in T]: U;
};

export enum ResourceType {
    Stone = 0,
    Food = 1,
    Idea = 2,
    Money = 3,
    Population = 4,
    Count = 5,
}

export enum CellType {
    Normal = 0,
    Goods = 1,
    Port = 2,
}

export type Cell =
{
    id: number;
    regionId: number;
    type: CellType;
    building: Building | undefined;
    resourceId: number | undefined;
}

export enum BuildingType {
  City = 0,
  Port = 1,
  Farm = 2,
  Workshop = 3,
  Wonder = 4
}

export type BuildingData = {
    id: number,
    image: string,
    title: string,
    cost:  number[],
    score: number,
    influence: number,
    tariffValue: number,
}

export type hexgameAction = (G : HexGame, pid : string) => void;

export function CreateCell(id : number, regionId : number, cell? : CellType) : Cell {
    return {
        id: id,
        regionId: regionId,
        type: cell ?? CellType.Normal,
        building: undefined,
        resourceId: undefined,
    };
}

export function CopyCell(other: Cell) : Cell {
    return {
        id: other.id,
        regionId: other.regionId,
        type: other.type,
        building: other.building,
        resourceId: other.resourceId,
    };
}
