import type { Game } from 'boardgame.io';

export enum PolicyType 
{
  City = 0,
  Port = 1,
  Farm = 2,
  Workshop = 3
};

export interface Scoring {
    (g : Game): number;
}

export type Policy =
{
    type: PolicyType;
    score: Scoring;
}