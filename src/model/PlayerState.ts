import { Building } from './Building';
import { Pillars } from './Pillars';
import { PolicyType } from './Policy';
import { Nullable, EnumDictionary, BuildingType } from './Types';

export type PlayerResource = {
    value: number;
    production: number;
};

export interface PlayerState {
    points: number;
    resources: PlayerResource[];
    pillars: Pillars;
    goods: [];
    buildings: Array<Building>;
    policy: Nullable<PolicyType>;
    policyPower: boolean;
    availableBuildings: EnumDictionary<BuildingType, number>;
}

export namespace PlayerState {
    export function tryPay(self: PlayerState, cost: number[]) : boolean {
        if (!canAfford(self, cost))
        {
            return false;
        }

        for (let type in cost) {
            self.resources[type].value -= cost[type];
        }

        return true;
    }

    export function canAfford(self: PlayerState, cost: number[]) : boolean {
        for (let type in cost) {
            if (cost[type] > self.resources[type].value)
            {
                return false;
            }
        }
        
        return true;
    }
}
