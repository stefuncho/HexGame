import { Building } from './Building';
import { PolicyType } from './Policy';
import { Nullable, EnumDictionary, BuildingType } from './Types';

export type PlayerResource = {
    value: number;
    production: number;
};

export interface PlayerState {
    points: number;
    resources: PlayerResource[];
    pillars: number[];
    goods: number[];
    buildings: Array<Building>;
    cards: string[];
    policy: Nullable<PolicyType>;
    policyPower: boolean;
    availableBuildings: EnumDictionary<BuildingType, number>;
    tariffProduction: number;
    taxProduction: number;
    unrest: number;
}

export namespace PlayerState {
    export function tryPay(self: PlayerState, cost: number[]) : boolean {
        if (!canAfford(self, cost))
        {
            return false;
        }

        for (let type in cost) {
            if (cost[type])
                self.resources[type].value -= cost[type];
        }

        return true;
    }

    export function canAfford(self: PlayerState, cost: number[]) : boolean {
        for (let type in cost) {
            if (cost[type] && cost[type] > self.resources[type].value)
            {
                return false;
            }
        }

        return true;
    }
}
