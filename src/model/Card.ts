import { BuildingType, hexgameAction, ResourceType } from './Types';
import { ResourcesEmpty } from "./Wallets";
import { HexGame } from "./HexGame";
import { PillarType } from "./Pillars";
import { BuildingTypes } from '../data/Dictionary';

export enum DeckType {
    Technology = 0,
    Build = 1,
    Population = 2,
    Tariff = 3,
    Count = 4,
}

export class Card {
    public deck: DeckType;

    public title: string;
    public description: string;

    public requirements: number[];
    public provide: number[];

    public onGameEnd?(G : HexGame, pid : string);
    public onPlay?(G : HexGame, pid : string);
}

export interface TechnologyCardParams {
  title : string, 
  description: string,
  isStarter?:boolean,
  provide: number[],
  requirements?: number[],
  score? : number, 
  onPlay? : hexgameAction, 
  onGameEnd? : hexgameAction,
}

export class TechnologyCard extends Card {
    public override deck = DeckType.Technology;

    public score : number = 0;
    public isStarter : boolean;

    constructor({ title, description, provide, requirements, isStarter = false,
            score, onPlay, onGameEnd } : TechnologyCardParams) {
        super();

        this.title = title;
        this.description = description;
        this.isStarter = isStarter;
        this.provide = provide;
        this.requirements = requirements;
        this.score = score;
        this.onPlay = onPlay;
        this.onGameEnd = onGameEnd;
    }
}

export class BuildCard extends Card {
    public override deck = DeckType.Build;
    public cost: number[];
}

export class BuildingCard extends BuildCard {
    constructor(type : BuildingType, onPlay : hexgameAction) {
        super();

        const data = BuildingTypes[type];
        this.cost = data.cost;
        this.title = data.title;
        this.onPlay = onPlay;
    }
}

export class ProjectCard extends BuildCard {

    private type: PillarType;

    constructor(type : PillarType) {
        super();

        this.cost = ResourcesEmpty
            .with(ResourceType.Idea, 5)
            .with(ResourceType.Stone, 5);

        this.title = "Projekt " + PillarType[type];
        this.description = "1 punkt za każdy " + PillarType[type] + " na koniec gry";
        this.type = type;
    }

    public override onGameEnd(G: HexGame, pid: string) {
        const playerData = G.players[pid];

        playerData.points += playerData.pillars[this.type];
    }
}