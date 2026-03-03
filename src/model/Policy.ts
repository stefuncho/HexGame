import { HexGame } from './HexGame';
import { Pillars } from './Pillars';

export enum PolicyType 
{
  CityState = 0,
  Monarchy = 1,
  Oligarchy = 2,
  Republic = 3,
  Theocracy = 4,
  Tyranny = 5,
};

export interface Scoring {
    (g : HexGame, pid : number): number;
}

export type Policy =
{
    type: PolicyType;
    req: Pillars;
    cost: number;
    score: Scoring;
}