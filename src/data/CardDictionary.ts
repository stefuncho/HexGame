import { ResourceType } from './../model/Types';
import { PillarType } from './../model/Pillars';
import { ProjectCard, TechnologyCard } from "../model/Card";
import { PillarsEmpty } from '../model/Wallets';

export const cardDictionary = {
    'b7493d61-0580-4f21-b72e-805b2f56e026':
        new TechnologyCard({
            title: 'Osada rolnicza', 
            description: '+3 produkcji żywności',
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Urbanization, 1)
                .with(PillarType.Population, 1)
                .with(PillarType.Food, 1), 
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Food].production += 3
        }),
    '676696c0-7b46-42bf-8b04-e42ac10f8186':
        new TechnologyCard({
            title: 'Rolnictwo', 
            description: '+3 produkcji żywności', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Food, 1)
                .with(PillarType.Population, 1), 
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Food].production += 3
        }),
    '08c658b0-fcb0-4907-9033-63821cad311e':
        new TechnologyCard({
            title: 'Alfabet', 
            description: '+3 produkcji żywności', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].production += 3
        }),
    '62e84d99-ad0a-4301-b3e7-f9feb895cbcc':
        new TechnologyCard({
            title: 'Sklepienie łukowe', 
            description: '+1 populacji, +2 produkcji idei', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Build, 1),
            onPlay: (G, pid) => {
                const resources = G.players[pid].resources;
                resources[ResourceType.Population].value += 1;
                resources[ResourceType.Idea].production += 2;
            }
        }),
    '0a4b6927-f1f5-4413-b4a9-3379732c73d6':
        new TechnologyCard({
            title: 'Architektura', 
            description: '+1 populacji, +1 produkcji kamienia', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Build, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => {
                const resources = G.players[pid].resources;
                resources[ResourceType.Population].value += 1;
                resources[ResourceType.Stone].production += 1;
            }
        }),
    'd688e9df-0cf0-4157-938f-bcea0cf210e8':
        new TechnologyCard({
            title: 'Sztuka', 
            description: '+5 idei, +3VP', 
            isStarter: true,
            score: 3,
            provide: PillarsEmpty.with(PillarType.Culture, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].value += 5,
        }),
    'e52ca327-7a29-46d0-8178-1b3ad4236887':
        new TechnologyCard({
            title: 'Łuki', 
            description: 'Ustaw 2 jednostki konne w dowolnym regionie, a następnie usuń 1 jednostkę przeciwnika w regionie, w którym masz jednostkę konną', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Military, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    '6acf4406-39be-4486-9b0f-b8be8b8f2544':
        new TechnologyCard({
            title: 'Brąz', 
            description: 'Ustaw 3 jednostki piechoty w dowolnym regionie, a następnie weź dobra towarowe (brązowe) z planszy', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Military, 1),
            requirements: PillarsEmpty.with(PillarType.Build, 1)
                .with(PillarType.Military, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    '489277e8-bb92-4ef9-90a0-1e7ca9f0875f':
        new TechnologyCard({
            title: 'Kartografia', 
            description: 'Weź dowolne dobro z planszy, +5 pieniędzy', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Military, 1),
            onPlay: (G, pid) => {
                // todo
                G.players[pid].resources[ResourceType.Money].value += 5
            }
        }),
    '014b21d0-b048-4058-86ac-959e8c0777a3':
        new TechnologyCard({
            title: 'Wolność obywatelska', 
            description: 'Możesz rekrutować dodatkowo 1 jednostkę wojskową', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Military, 1),
            requirements: PillarsEmpty.with(PillarType.Economic, 1)
                .with(PillarType.Military, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    '237f2374-5e6e-4a88-bb5c-1c979c37d072':
        new TechnologyCard({
            title: 'Państwo miasto', 
            description: '+3 produkcja podatku, +2 VP', 
            isStarter: true,
            score: 2,
            provide: PillarsEmpty.with(PillarType.Military, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    'c49a2f1e-d7a7-4712-953d-c501c09fdb00':
        new TechnologyCard({
            title: 'Gliniane cegły', 
            description: '+1 populacji, +2 produkcji kamienia', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Build, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => {
                const resources = G.players[pid].resources;
                resources[ResourceType.Population].value += 1;
                resources[ResourceType.Stone].production += 2;
            }
        }),
    '6ed41b71-5bdf-46e2-8c6a-7e7dadbe7f95':
        new TechnologyCard({
            title: 'Konstrukcja', 
            description: 'Twój najlepszy projekt punktuje 2 razy', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Build, 1)
                .with(PillarType.Urbanization, 1),
            onGameEnd: (G, pid) => {
                // todo
            }
        }),
    '32dfda96-665f-4ef4-b44c-1e98c7737831':
        new TechnologyCard({
            title: 'Osada rzemieślnicza', 
            description: '+10 pieniędzy', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Economic, 1)
                .with(PillarType.Population, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Money].value += 10,
        }),
    '976bf814-d82a-4d94-bd29-ceb0f911e960':
        new TechnologyCard({
            title: 'Rzemiosło', 
            description: 'Zdobądź uniwersalne dobro (liczące się jako dowolne dobro)', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Economic, 1)
                .with(PillarType.Build, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    'cc7be6ea-78f4-44f3-aca4-b2a42043f701':
        new TechnologyCard({
            title: 'Taniec', 
            description: '+5 idei, +3VP', 
            isStarter: true,
            score: 3,
            provide: PillarsEmpty.with(PillarType.Culture, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].value += 5,
        }),
    '7ba707b2-b70b-4098-b724-980144993a11':
        new TechnologyCard({
            title: 'Racje żywieniowe', 
            description: '+1 populacji, +1 produkcji żywności', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Population, 1)
                .with(PillarType.Government, 1)
                .with(PillarType.Food, 1),
            onPlay: (G, pid) => {
                const resources = G.players[pid].resources;
                resources[ResourceType.Population].value += 1;
                resources[ResourceType.Food].production += 1;
            }
        }),
    '8bc1e0d0-6077-4686-9469-e5a162914f25':
        new TechnologyCard({
            title: 'Teatr', 
            description: '+5 idei, +3VP', 
            isStarter: true,
            score: 3,
            provide: PillarsEmpty.with(PillarType.Culture, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].value += 5,
        }),
    '24dc64cd-647c-40a5-b238-421474940281':
        new TechnologyCard({
            title: 'Eksploracja', 
            description: 'Ustaw 1 jednostkę piechoty i 1 farmę w regionie, w którym nie masz miasta', 
            isStarter: true,
            score: 3,
            provide: PillarsEmpty.with(PillarType.Science, 1)
                .with(PillarType.Military, 1),
            requirements: PillarsEmpty.with(PillarType.Economic, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    'd234e110-d4c4-4646-866a-3bd499e84497':
        new TechnologyCard({
            title: 'Rybactwo', 
            description: '+3 produkcji żywności (weź znacznik ryby z planszy)', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Population, 1)
                .with(PillarType.Food, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    '7f319780-77b7-47f6-8cdb-82240a778b08':
        new TechnologyCard({
            title: 'Historia', 
            description: 'Na koniec gry: +1 VP za każdą jednostkę wojskową, +2 VP za każde osiągnięcie cywilizacji', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1),
            requirements: PillarsEmpty.with(PillarType.Military, 1)
                .with(PillarType.Culture, 1),
            onGameEnd: (G, pid) => {
                // todo
            }
        }),
    'e7722296-9b40-4324-aa15-c2cb46aa6d04':
        new TechnologyCard({
            title: 'Irygacja', 
            description: '+2 produkcji żywności za każdy posiadany filar ' + PillarType[PillarType.Government], 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Population, 1)
                .with(PillarType.Food, 1),
            onGameEnd: (G, pid) => {
                // todo
            }
        }),
    'a8e62c8c-a774-495b-adbc-51bc4f1a3dfb':
        new TechnologyCard({
            title: 'Kodeks prawny', 
            description: '+3 dowolnej produkcji', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Government, 1)
                .with(PillarType.Science, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    '9a67897c-87e2-44be-9fcd-6606c0c960b0':
        new TechnologyCard({
            title: 'Magisterium', 
            description: '+3 dowolnej produkcji', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Government, 1)
                .with(PillarType.Science, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    'b21150f9-6b6e-44a3-b8a9-2221d225a002':
        new TechnologyCard({
            title: 'Muzyka', 
            description: '+5 idei, +3VP', 
            isStarter: true,
            score: 3,
            provide: PillarsEmpty.with(PillarType.Culture, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].value += 5,
        }),
    'f1c14b66-b4cb-444a-9fb5-d799b62cf3ac':
        new TechnologyCard({
            title: 'System liczbowy', 
            description: '+3 produkcji idei', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].production += 3,
        }),
    '49b21b7f-5da4-4234-af04-2f59b7a927f5':
        new TechnologyCard({
            title: 'Tradycja językowa', 
            description: '+3 produkcji idei', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].production += 3,
        }),
    '8519f647-2edb-4084-8fd4-29166198826d':
        new TechnologyCard({
            title: 'Filozofia', 
            description: 'Koniec gry: +1 VP za każdy filar ' + PillarType[PillarType.Science], 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1)
                .with(PillarType.Government, 1),
            onGameEnd: (G, pid) => {
                // todo
            }
        }),
    '55a2e496-f9ae-44c4-aead-d7822500dda2':
        new TechnologyCard({
            title: 'Poezja', 
            description: '+5 idei, +3VP', 
            isStarter: true,
            score: 3,
            provide: PillarsEmpty.with(PillarType.Culture, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].value += 5,
        }),
    '807ab701-e038-42c3-b56c-04bba7e6be9b':
        new TechnologyCard({
            title: 'Garncarstwo', 
            description: '+2 produkcja żywności, +3 produkcja cła', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Economic, 1)
                .with(PillarType.Food, 1)
                .with(PillarType.Population, 1),
            requirements: PillarsEmpty.with(PillarType.Food, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    '0374ba67-cfca-4be0-9291-121f9e66d206':
        new TechnologyCard({
            title: 'Kamieniołom', 
            description: '+3 produkcji kamienia', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Economic, 1)
                .with(PillarType.Build, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Stone].production += 3,
        }),
    '25bb12c7-c00d-4871-b859-d7203e0f3ed3':
        new TechnologyCard({
            title: 'Pałac królewski', 
            description: '+3 produkcji cła, +10 pieniędzy, +2VP', 
            isStarter: true,
            score: 2,
            provide: PillarsEmpty.with(PillarType.Government, 1)
                .with(PillarType.Build, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    '652ccbd7-915e-4885-8beb-544230197669':
        new TechnologyCard({
            title: 'Nasiona', 
            description: '+3 produkcji żywności', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Food, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Food].production += 3,
        }),
    '2734636f-cd51-4cc1-8456-e925283d7a1e':
        new TechnologyCard({
            title: 'Włócznie', 
            description: 'Ustaw 2 jednostki piechoty w dowolnym regionie, a następnie usuń 1 jednostkę przeciwnika w regionie, w którym masz jednostkę piechoty', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Military, 1),
            onPlay: (G, pid) => {
                // todo
            }
        }),
    'ea678918-eb38-43a7-a4d4-69760d11ce54':
        new TechnologyCard({
            title: 'Kafelki', 
            description: '+2 produkcji kamienia, koniec gry: +2VP za każdy wybudowany cud', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Build, 1)
                .with(PillarType.Culture, 1),
            requirements: PillarsEmpty.with(PillarType.Culture, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Stone].production += 2,
            onGameEnd: (G, pid) => {
                // todo
            },
        }),
    'af6e0930-62a0-4493-ab16-3024c231f954':
        new TechnologyCard({
            title: 'Szlaki handlowe', 
            description: '+2 produkcji cła, +10 pieniędzy', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Economic, 1),
            requirements: PillarsEmpty.with(PillarType.Economic, 1),
            onPlay: (G, pid) => {
                // todo
            },
        }),
    '49a632a4-5a8d-4b1b-839f-286706797fa2':
        new TechnologyCard({
            title: 'Wioski', 
            description: '+1 populacji, +1 produkcji żywności', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Population, 1)
                .with(PillarType.Government, 1),
            onPlay: (G, pid) => {
                const resources = G.players[pid].resources;
                resources[ResourceType.Population].value += 1;
                resources[ResourceType.Food].production += 1;
            },
        }),
    '8a0bac63-517b-4352-93c8-d423c9bc7a6e':
        new TechnologyCard({
            title: 'Koło', 
            description: '+1 produkcji cła, +1 produkcji kamienia', 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1)
                .with(PillarType.Economic, 1)
                .with(PillarType.Military, 1),
            onPlay: (G, pid) => {
                const resources = G.players[pid].resources;
                resources[ResourceType.Stone].production += 1;
                // todo
            },
        }),
    '5d0184ac-75be-43d1-ba78-d0c74a832027':
        new TechnologyCard({
            title: 'Pismo', 
            description: '+1 produkcji idei za każdy ' + PillarType[PillarType.Science], 
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1)
                .with(PillarType.Culture, 1)
                .with(PillarType.Government, 1),
            requirements: PillarsEmpty.with(PillarType.Science, 1),
            onPlay: (G, pid) => {
                const playerData = G.players[pid];
                playerData.resources[ResourceType.Stone].production 
                    += playerData.pillars[PillarType.Science];
            },
        }),

    ///////////////////////
    // Projekty
    ///////////////////////

    '036c2d65-8dd7-4010-aa36-de738953e756': new ProjectCard(PillarType.Population),
    '54412e21-810c-4c38-9fc4-2591ccc4ae3d': new ProjectCard(PillarType.Build),
    'fd5d138a-fa5c-4792-9581-c3be99cfe1b4': new ProjectCard(PillarType.Culture),
    '4877178c-625c-4855-bc53-eac263c65c7f': new ProjectCard(PillarType.Government),
    '655c681c-46df-4c49-a125-b52a30772949': new ProjectCard(PillarType.Food),
    '5e415cd2-f1fd-4176-916d-c278dfa534b3': new ProjectCard(PillarType.Urbanization),
    'bde4649c-c098-4420-a6da-b2e01e83ad96': new ProjectCard(PillarType.Science),
    'b0327ad6-5d96-4f12-909c-d72b2cae66fc': new ProjectCard(PillarType.Economic),
    '4465a73f-9b2c-4e87-b96b-f84413b72804': new ProjectCard(PillarType.Military),
}