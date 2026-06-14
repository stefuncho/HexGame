import type { Game } from 'boardgame.io';
import { Cell } from "./Types";
import { Nullable } from './Types';
import { PlayerState } from './PlayerState';

export interface Scoreboard {
    influenceByPlayerByRegion : number[][],
    scoreByPlayerByRegion : number[][],
    policyScoreByPlayer : number[],
}

export interface HexGame extends Game {
    cells: Nullable<Cell>[][],
    players: { [ playerID : string ] : PlayerState },
    tariff: number,
    deck: string[][],
    market: string[][],
    scoreboard: Scoreboard[],
}