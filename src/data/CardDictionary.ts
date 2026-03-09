import { ResourceType } from './../model/Types';
import { PillarType } from './../model/Pillars';
import { TechnologyCard } from "../model/Card";
import { PillarsEmpty } from '../model/Wallets';

export const CardDictionary = {
    'b7493d61-0580-4f21-b72e-805b2f56e026':
        new TechnologyCard('Urbanizacja', '+3 Produkcji żywności', PillarsEmpty.with(PillarType.Culture, 1), undefined, undefined,
            (G, pid) => G.players[pid].resources[ResourceType.Food].production += 3
        ),
}