export enum PillarType {
  Culture = 0,
  Science = 1,
  Technology = 2,
  Government = 3,
  Religion = 4,
  Military = 5,
  Food = 6,
  Trade = 7,
  Population = 8,
};

export type Pillars =
{
    dict : { [id : number ] : number}
}

export namespace PillarsExt {
    export function create() : Pillars {
        const obj : Pillars = { dict: {} };

        for (let pillar in PillarType) {
            obj.dict[pillar] = 0;
        }

        return obj;
    }

    export function increase(self: Pillars, type: PillarType , count: number) : void {
        self.dict[type] += count;
    }

    export function add(self: Pillars, other: Pillars) : void {
        for (let pillar in other.dict) {
            self.dict[pillar] += other.dict[pillar];
        }
    }

    export function satisfies(self: Pillars, other:Pillars) : boolean {
        for (let pillar in other.dict) {
            if (other.dict[pillar] > self.dict[pillar])
            {
                return false;
            }
        }
        return true;
    }
}