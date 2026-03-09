import { PillarType, ResourceType } from "./Types";

export const ResourcesEmpty: number[] = Array(ResourceType.Count);
export const PillarsEmpty: number[] = Array(PillarType.Count);

export function satisfies(self : number[], other: number[]) {
    for (let type in other) {
        if (other[type] > self[type])
        {
            return false;
        }
    }
    
    return true;
}
