import type { Game } from 'boardgame.io';
import { Pillars } from './Pillars';
import { Building } from './Building';
import { BuildingType, Cell, EnumDictionary } from "./Types";
import { PolicyType } from './Policy';
import { Nullable } from './Types';

export interface PlayerState {
    points: number,
    resources: any,
    population: number,
    pillars: Pillars,
    goods: [],
    buildings: Array<Building>,
    policy: Nullable<PolicyType>,
    policyPower: boolean,
    availableBuildings: EnumDictionary<BuildingType, number>,
}

export interface HexGame extends Game {
    cells: Nullable<Cell>[][],
    players: { [ playerID : string ] : PlayerState },
}