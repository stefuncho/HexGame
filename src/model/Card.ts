import { BuildingType, hexgameAction, ResourceType } from './Types';
import { ResourcesEmpty } from "./Wallets";
import { HexGame } from "./HexGame";
import { PillarType } from "./Pillars";
import { BuildingTypes, TradeTokens } from '../data/Dictionary';

export enum DeckType {
    Technology = 0,
    Build = 1,
    Population = 2,
    Tariff = 3,
    Count = 4,
}

export const DeckTypeNames = [
    "Technologie",
    "Budowanie",
    "Populacja",
    "Podatek i cło",
];

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
    constructor(type : BuildingType) {
        super();

        const data = BuildingTypes[type];
        this.cost = data.cost;
        this.title = data.title;
    }
}

export interface CityCardParams {
  title : string,
  description: string,
  provide: number[],
  onPlay : hexgameAction,
}

export class CityCard extends BuildingCard {
    constructor(params : CityCardParams) {
        super(BuildingType.City);

        this.title = params.title;
        this.description = params.description;
        this.provide = params.provide;
        this.onPlay = params.onPlay;
    }
}

export class FarmCard extends BuildingCard {
    constructor() {
        super(BuildingType.Farm);

        this.provide = Array(PillarType.Count).with(PillarType.Food, 1);
        this.description = "+5 żywności\n+1 produkcji żywności";
    }

    public override onPlay(G: HexGame, pid: string) {
        const foodResource = G.players[pid].resources[ResourceType.Food];

        foodResource.value += 5;
        foodResource.production += 1;
    }
}

export class WorkshopCard extends BuildingCard {
    private tradeTokens : number[];

    constructor(tradeTokens : number[]) {
        super(BuildingType.Workshop);

        this.description = "+5 pieniędzy\n+1 produkcji cła\n\n"
            + tradeTokens.map(token => TradeTokens[token].title).join(" + ")
            + " => 5VP";

        this.tradeTokens = tradeTokens;
    }

    public override onPlay(G: HexGame, pid: string) {
        const playerData = G.players[pid];

        playerData.resources[ResourceType.Money].value += 5;
        playerData.tariffProduction += 1;
    }

    public override onGameEnd(G: HexGame, pid: string) {
        const playerData = G.players[pid];

        if (this.tradeTokens.every(x => playerData.goods.indexOf(x) >= 0))
            playerData.points += 5;
    }
}

export class PortCard extends BuildingCard {
    constructor() {
        super(BuildingType.Port);

        this.provide = Array(PillarType.Count)
            .with(PillarType.Economic, 1)
            .with(PillarType.Science, 1);

        this.description = "+10 pieniędzy";
    }

    public override onPlay(G: HexGame, pid: string) {
        G.players[pid].resources[ResourceType.Money].value += 10;
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

type TariffCardParams = {
    title : string,
    unrest : number,
    pillarsMultiplier? : number,
    cityMultiplier? : number,
    goodsMultiplier? : number,
    populationMultiplier? : number,
    taxMultiplier? : number,
    tariffMultiplier? : number,
}

export class TariffCard extends Card {
    private unrest : number;
    private pillarsMultiplier : number;
    private cityMultiplier : number;
    private goodsMultiplier : number;
    private populationMultiplier: number;
    private taxMultiplier: number;
    private tariffMultiplier: number;

    constructor(params: TariffCardParams) {
        super();

        this.deck = DeckType.Tariff;
        this.title = params.title;
        this.unrest = params.unrest;
        this.pillarsMultiplier = params.pillarsMultiplier;
        this.cityMultiplier = params.cityMultiplier;
        this.goodsMultiplier = params.goodsMultiplier;
        this.populationMultiplier = params.populationMultiplier;
        this.taxMultiplier = params.taxMultiplier;
        this.tariffMultiplier = params.tariffMultiplier;

        const addMultiplier = (i: number) => (i > 1 ? i + "x " : "");

        this.description = "("
            + (this.pillarsMultiplier > 0 ? "+" + addMultiplier(this.pillarsMultiplier) + PillarType[PillarType.Government] + "\n" : "")
            + (this.cityMultiplier > 0 ? "+" + addMultiplier(this.cityMultiplier) + "ilość miast\n" : "")
            + (this.goodsMultiplier > 0 ? "+" + addMultiplier(this.goodsMultiplier) + "towary\n" : "")
            + (this.populationMultiplier > 0 ? "+" + addMultiplier(this.populationMultiplier) + "populacja\n" : "")
            + (this.taxMultiplier > 0 ? "+" + addMultiplier(this.taxMultiplier) + "produkcja podatku\n" : "")
            + (this.tariffMultiplier > 0 ? "+" + addMultiplier(this.tariffMultiplier) + "produkcja cła\n" : "")
            + ") złota"
            + "\n\n Niepokój +" + this.unrest;
    }

    public override onPlay(G: HexGame, pid: string) {
        const playerData = G.players[pid];

        playerData.resources[ResourceType.Money].value
            += this.pillarsMultiplier * playerData.pillars[PillarType.Government]
                + this.cityMultiplier * playerData.buildings.filter(x => x.type === BuildingType.City).length
                + this.goodsMultiplier * playerData.goods.length
                + this.populationMultiplier * playerData.resources[ResourceType.Population].value
                + this.taxMultiplier * playerData.taxProduction
                + this.tariffMultiplier * playerData.tariffProduction;

        playerData.unrest += this.unrest;
    }
}

type PopulationCardParams = {
    foodCost: number,
    populationGain: number
}

export class PopulationCard extends Card {
    public foodCost: number;
    private populationGain: number;

    constructor(params: PopulationCardParams) {
        super();

        this.deck = DeckType.Population;
        this.title = "Populacja";
        this.description = params.populationGain + " populacji\nza " + params.foodCost + " żywności";
        this.foodCost = params.foodCost;
        this.populationGain = params.populationGain;
    }

    public override onPlay(G: HexGame, pid: string) {
        const playerData = G.players[pid];
        playerData.resources[ResourceType.Food].value -= this.foodCost;
        playerData.resources[ResourceType.Population].value += this.populationGain;
    }
}