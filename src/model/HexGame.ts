import type { Game } from 'boardgame.io';
import { Pillars } from './Pillars';
import { Building } from './Building';

export interface PlayerState {
    points: number,
    resources: any,
    population: number,
    pillars: Pillars,
    goods: [],
    buildings: Array<Building>,
    policyPower: boolean,
}

export interface HexGame extends Game {
    players: Array<PlayerState>
}