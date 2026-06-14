import { Building } from './Building';
import { PolicyType } from './Policy';
import { Nullable, EnumDictionary, BuildingType, isBase, ResourceType } from './Types';

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

        let missingResource = 0;

        for (let type in cost) {
            const typeCost = cost[type];

            if (!typeCost)
                continue;

            const selfTypeValue = self.resources[type].value;

            if (selfTypeValue >= typeCost)
                self.resources[type].value -= typeCost;
            else {
                missingResource += typeCost - selfTypeValue;
                self.resources[type].value = 0;
            }
        }

        self.resources[ResourceType.Money].value -= 2 * missingResource;

        return true;
    }

    export function canAfford(self: PlayerState, cost: number[]) : boolean {
        let missingResource = 0;

        for (let type = 0; type < cost.length; type++) {
            if (cost[type] && cost[type] > self.resources[type].value)
            {
                if (isBase(type))
                    missingResource += cost[type] - self.resources[type].value
                else
                    return false;
            }
        }

        if (missingResource > 2 * self.resources[ResourceType.Money].value)
            return false;

        return true;
    }

    export function getCities(self: PlayerState) : Array<Building> {
        return self.buildings.filter(x => x.type === BuildingType.City);
    }
}
