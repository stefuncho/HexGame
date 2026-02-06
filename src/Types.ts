export type Nullable<T> = T | null;

export type Cell =
{
    id: number;
    regionId: number;
    buildingType: number | undefined;
    resourceId: number | undefined;
}

export function CreateCell(id : number, regionId : number) : Cell {
    return {
        id: id,
        regionId: regionId,
        buildingType: undefined,
        resourceId: undefined,
    };
}
