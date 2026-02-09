import { Building } from "./Building.ts"
export * from "./Building.ts"

export type Nullable<T> = T | null;

export enum ResourceType {
    Stone = 0,
    Food = 1,
    Idea = 2,
    Count = 3,
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
