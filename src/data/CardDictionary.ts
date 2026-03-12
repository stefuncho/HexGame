import { ResourceType } from './../model/Types';
import { PillarType } from './../model/Pillars';
import { CityCard, FarmCard, PopulationCard, PortCard, ProjectCard, TariffCard, TechnologyCard, WorkshopCard } from "../model/Card";
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
            description: '+1 populacji\n+2 produkcji idei',
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
            description: '+1 populacji\n+1 produkcji kamienia',
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
            description: '+5 idei\n+3VP',
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
            description: 'Weź dowolne dobro z planszy\n+5 pieniędzy',
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
            description: '+3 produkcja podatku\n+2 VP',
            isStarter: true,
            score: 2,
            provide: PillarsEmpty.with(PillarType.Military, 1),
            onPlay: (G, pid) => G.players[pid].taxProduction += 3,
        }),
    'c49a2f1e-d7a7-4712-953d-c501c09fdb00':
        new TechnologyCard({
            title: 'Gliniane cegły',
            description: '+1 populacji\n+2 produkcji kamienia',
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
            description: '+5 idei\n+3VP',
            isStarter: true,
            score: 3,
            provide: PillarsEmpty.with(PillarType.Culture, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].value += 5,
        }),
    '7ba707b2-b70b-4098-b724-980144993a11':
        new TechnologyCard({
            title: 'Racje żywieniowe',
            description: '+1 populacji\n+1 produkcji żywności',
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
            description: '+5 idei\n+3VP',
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
            description: 'Na koniec gry:\n+1 VP za każdą jednostkę wojskową\n+2 VP za każde osiągnięcie cywilizacji',
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
            onPlay: (G, pid) => {
                const playerData = G.players[pid];
                playerData.resources[ResourceType.Food].production
                    += 2 * playerData.pillars[PillarType.Government];
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
            description: '+5 idei\n+3VP',
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
            description: 'Koniec gry:\n+1 VP za każdy filar ' + PillarType[PillarType.Science],
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1)
                .with(PillarType.Government, 1),
            onGameEnd: (G, pid) => {
                const playerData = G.players[pid];
                playerData.points += playerData.pillars[PillarType.Science];
            }
        }),
    '55a2e496-f9ae-44c4-aead-d7822500dda2':
        new TechnologyCard({
            title: 'Poezja',
            description: '+5 idei\n+3VP',
            isStarter: true,
            score: 3,
            provide: PillarsEmpty.with(PillarType.Culture, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].value += 5,
        }),
    '807ab701-e038-42c3-b56c-04bba7e6be9b':
        new TechnologyCard({
            title: 'Garncarstwo',
            description: '+2 produkcja żywności\n+3 produkcja cła',
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Economic, 1)
                .with(PillarType.Food, 1)
                .with(PillarType.Population, 1),
            requirements: PillarsEmpty.with(PillarType.Food, 1),
            onPlay: (G, pid) => {
                const playerData = G.players[pid];
                playerData.resources[ResourceType.Food].production += 2;
                playerData.tariffProduction += 3;
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
            description: '+3 produkcji cła\n+10 pieniędzy\n+2VP',
            isStarter: true,
            score: 2,
            provide: PillarsEmpty.with(PillarType.Government, 1)
                .with(PillarType.Build, 1),
            onPlay: (G, pid) => {
                const playerData = G.players[pid];
                playerData.resources[ResourceType.Money].value += 10;
                playerData.tariffProduction += 3;
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
            description: '+2 produkcji kamienia\nkoniec gry: +2VP za każdy wybudowany cud',
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
            description: '+2 produkcji cła\n+10 pieniędzy',
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Economic, 1),
            requirements: PillarsEmpty.with(PillarType.Economic, 1),
            onPlay: (G, pid) => {
                const playerData = G.players[pid];
                playerData.resources[ResourceType.Money].value += 10;
                playerData.tariffProduction += 2;
            },
        }),
    '49a632a4-5a8d-4b1b-839f-286706797fa2':
        new TechnologyCard({
            title: 'Wioski',
            description: '+1 populacji\n+1 produkcji żywności',
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
            description: '+1 produkcji cła\n+1 produkcji kamienia',
            isStarter: true,
            provide: PillarsEmpty.with(PillarType.Science, 1)
                .with(PillarType.Economic, 1)
                .with(PillarType.Military, 1),
            onPlay: (G, pid) => {
                const playerData = G.players[pid];
                playerData.resources[ResourceType.Stone].production += 1;
                playerData.tariffProduction += 1;
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

    ///////////////////////
    // Budynki
    ///////////////////////

    '6665992d-c482-4cb2-ac23-637337ece32c': new WorkshopCard([0, 1, 2]),
    '9f93a04d-d8a7-458e-bbb5-c2306231bc8f': new WorkshopCard([0, 1, 2]),
    '0e4de0c4-f7f3-49ca-a401-9e5554bb8fa9': new WorkshopCard([3, 4, 5]),
    '89244f3b-9014-4949-a564-b0dae44f6fd6': new WorkshopCard([3, 4, 5]),
    '04366862-0e48-4f8a-942f-5d2fa8540b91': new WorkshopCard([6, 7, 8]),
    'a1df8e1b-1d13-40e7-9fb2-1ec279b3410f': new WorkshopCard([6, 7, 8]),
    '2d949363-b1be-4ef0-b0ff-496d5523603f': new WorkshopCard([9, 10, 11]),
    '06694e58-0695-40c3-a970-597f88330238': new WorkshopCard([9, 10, 11]),
    'feecca3f-aa20-4f9c-bedf-b0f5c5b0856b': new FarmCard(),
    '7ddbc449-92a1-4aa0-8e04-a77b6ebf986a': new FarmCard(),
    '8f73fac1-c70d-4412-88eb-08c3f2aa6342': new FarmCard(),
    '1dfd481a-4041-417e-a79f-9b93f7856385': new FarmCard(),
    '4de6f2a1-5a97-4c38-bf50-7592f6d4c970': new FarmCard(),
    '11bc9f00-0eef-4a6d-a52e-271388502452': new FarmCard(),
    '74068c45-0d38-4fa6-a57a-d8c189df4f7f': new FarmCard(),
    '4917d813-566b-459d-b7b5-8e8a2340dc1f': new FarmCard(),
    '7c879d2b-9f9f-400d-b6dd-c456722e1b5f': new PortCard(),
    '23a05dd8-f0b6-411c-93aa-56ad96c0584c': new PortCard(),
    'eb011da0-1321-4d5f-99cd-f9015b358fd6': new PortCard(),
    'a57153fc-b9c7-41f1-a928-14f66d0399a8': new PortCard(),
    '35c616be-3c0d-4952-9929-4b285e0f1a42': new PortCard(),
    '0c492877-bf81-44f1-a25f-e687ce3adb88':
        new CityCard({
            title: 'Ludne miasto',
            description: '+1 populacji',
            provide: PillarsEmpty.with(PillarType.Population, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Population].value += 1,
        }),
    '26fb8437-ec17-4358-b7a1-32756d195b83':
        new CityCard({
            title: 'Miasto fortowe',
            description: '+1 jednostka wojskowa',
            provide: PillarsEmpty.with(PillarType.Military, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => {
                // todo
            },
        }),
    '8d39034b-dfc9-424f-b926-9f917cf488ae':
        new CityCard({
            title: 'Miasto kopalniane',
            description: '+1 kamienia',
            provide: PillarsEmpty.with(PillarType.Build, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Stone].value += 5,
        }),
    'a5390b12-0635-4441-a7c6-1ba699c0d522':
        new CityCard({
            title: 'Miasto rolnicze',
            description: '+3 produkcji żywności',
            provide: PillarsEmpty.with(PillarType.Food, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Food].production += 3,
        }),
    'dc6a075a-3a3c-4eb2-9d76-7edad7605b68':
        new CityCard({
            title: 'Miasto naukowe',
            description: '+1 produkcji idei',
            provide: PillarsEmpty.with(PillarType.Science, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => G.players[pid].resources[ResourceType.Idea].production += 3,
        }),
    '20d30638-da67-4dd7-a54d-f4510d20da33':
        new CityCard({
            title: 'Miasto handlowe',
            description: '+1 produkcji cła',
            provide: PillarsEmpty.with(PillarType.Economic, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => G.players[pid].tariffProduction += 3,
        }),
    '225d05a7-d03f-46e1-875c-95decbef332f':
        new CityCard({
            title: 'Stolica',
            description: 'Odśwież dowolny rynek',
            provide: PillarsEmpty.with(PillarType.Government, 2)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => {
                // todo
            },
        }),
    '61aa4d32-d13f-4d6a-8aa3-056829d96ad6':
        new CityCard({
            title: 'Miasto kultury',
            description: '-3 niepokoju',
            provide: PillarsEmpty.with(PillarType.Culture, 1)
                .with(PillarType.Urbanization, 1),
            onPlay: (G, pid) => G.players[pid].unrest -= 3,
        }),

    ///////////////////////
    // Populacja
    ///////////////////////

    '038e2476-f696-4899-9eaf-0a764a26e645': new PopulationCard({foodCost:5, populationGain:1}),
    'dd55a45e-3321-43c6-ad1d-85349c7a4ed1': new PopulationCard({foodCost:5, populationGain:1}),
    'be786b0b-d1a5-486d-ae43-212e7ce2ec4c': new PopulationCard({foodCost:5, populationGain:1}),
    'e7281bdd-5e8c-4f81-8c8e-18bbb1bc6ef7': new PopulationCard({foodCost:5, populationGain:1}),
    'cce117c5-54ec-475b-8094-a1ca06cb6d38': new PopulationCard({foodCost:5, populationGain:1}),
    'e50591cb-fc99-4ac0-b5bb-460a21c0ce61': new PopulationCard({foodCost:12, populationGain:2}),
    '431145af-d3db-4516-8583-26b17b22fe79': new PopulationCard({foodCost:12, populationGain:2}),
    'f1513b77-6b15-4d99-9db7-2c3f1e7878e6': new PopulationCard({foodCost:12, populationGain:2}),
    'f2acdef9-d14f-456b-991a-40034020da8f': new PopulationCard({foodCost:12, populationGain:2}),
    'b0b837e5-c0ee-4bc7-8397-dfc835a6d906': new PopulationCard({foodCost:12, populationGain:2}),
    'e46979fd-99e9-4ed2-816c-4782ab54c9e0': new PopulationCard({foodCost:20, populationGain:3}),
    '3ef389dd-2b6a-44e4-8ec0-899c7dee2c0a': new PopulationCard({foodCost:20, populationGain:3}),
    '9a42b1d3-c339-40f4-9954-8e9284b6ece6': new PopulationCard({foodCost:20, populationGain:3}),
    '5e119e55-fd2e-495f-b118-63530904d0f9': new PopulationCard({foodCost:20, populationGain:3}),
    '0083ad4e-d31f-45a8-841b-265a9cad77f6': new PopulationCard({foodCost:20, populationGain:3}),
    '0b1bc5a6-87e2-4c37-a3cd-b783e414a922': new PopulationCard({foodCost:30, populationGain:4}),
    '60f566ff-6cef-4ddf-9b6d-21a3750b5abb': new PopulationCard({foodCost:30, populationGain:4}),
    '3da8b042-cc4b-45e9-8e1d-56e981aed815': new PopulationCard({foodCost:30, populationGain:4}),
    '11c56147-1738-4af7-be2b-b58198a496e0': new PopulationCard({foodCost:30, populationGain:4}),
    '4070a4ce-3bd1-4cf7-a029-7b28d4b2fe62': new PopulationCard({foodCost:30, populationGain:4}),

    ///////////////////////
    // Podatki i cło
    ///////////////////////

    '0366709c-27b8-418e-a49b-689c77f43133': new TariffCard({title:"Cło", unrest:2, goodsMultiplier:3, cityMultiplier:2, tariffMultiplier:1}),
    'd568e3fb-0a47-4f00-8724-62469baa6f03': new TariffCard({title:"Cło", unrest:2, goodsMultiplier:3, cityMultiplier:2, tariffMultiplier:1}),
    'b566ecb2-f8e2-4be4-ac66-134113f09411': new TariffCard({title:"Cło", unrest:2, goodsMultiplier:3, cityMultiplier:2, tariffMultiplier:1}),
    'ee647d57-47ab-4085-8f0c-c14035b15f38': new TariffCard({title:"Cło", unrest:2, goodsMultiplier:3, cityMultiplier:2, tariffMultiplier:1}),
    '412ba0a3-4cfc-490c-98ef-b6db19e88564': new TariffCard({title:"Cło", unrest:2, goodsMultiplier:3, cityMultiplier:2, tariffMultiplier:1}),
    '1e56d40e-c479-4591-a377-c58f3e37f078': new TariffCard({title:"Cło", unrest:1, goodsMultiplier:2, cityMultiplier:1, tariffMultiplier:1}),
    '05178b0c-13dc-4548-b57f-edb331a1ac0a': new TariffCard({title:"Cło", unrest:1, goodsMultiplier:2, cityMultiplier:1, tariffMultiplier:1}),
    'bf1161b8-1ff8-4664-9441-b9fe842325f3': new TariffCard({title:"Cło", unrest:1, goodsMultiplier:2, cityMultiplier:1, tariffMultiplier:1}),
    'fafe6370-e723-4db9-80a3-113889468943': new TariffCard({title:"Cło", unrest:1, goodsMultiplier:2, cityMultiplier:1, tariffMultiplier:1}),
    '618a1216-ee41-487e-a136-babed0407c1b': new TariffCard({title:"Cło", unrest:1, goodsMultiplier:2, cityMultiplier:1, tariffMultiplier:1}),
    'd83749ef-17ee-4648-ab9d-abcc39b467d2': new TariffCard({title:"Podatek", unrest:3, populationMultiplier:2, pillarsMultiplier:2, taxMultiplier:1}),
    '98f16af5-efe5-446c-89cc-f8945ff088e5': new TariffCard({title:"Podatek", unrest:3, populationMultiplier:2, pillarsMultiplier:2, taxMultiplier:1}),
    '659e2121-3dca-48bc-afd1-96d77c10f38c': new TariffCard({title:"Podatek", unrest:3, populationMultiplier:2, pillarsMultiplier:2, taxMultiplier:1}),
    'c4482c78-3da6-4842-81d1-e512298213a7': new TariffCard({title:"Podatek", unrest:3, populationMultiplier:2, pillarsMultiplier:2, taxMultiplier:1}),
    '4e8d7ea2-e810-4bbc-ac5a-12a6ca2e54f1': new TariffCard({title:"Podatek", unrest:3, populationMultiplier:2, pillarsMultiplier:2, taxMultiplier:1}),
    'a26a6b96-0f26-4765-abd8-48698b32e057': new TariffCard({title:"Podatek", unrest:2, populationMultiplier:1, pillarsMultiplier:1, taxMultiplier:1}),
    'ab68e440-d410-47d0-95f6-8aa4b5eb41f6': new TariffCard({title:"Podatek", unrest:2, populationMultiplier:1, pillarsMultiplier:1, taxMultiplier:1}),
    '0b69d56f-02cc-4c30-9c65-9c93a7c8b40e': new TariffCard({title:"Podatek", unrest:2, populationMultiplier:1, pillarsMultiplier:1, taxMultiplier:1}),
    '8c0cbc7d-1d76-4dbb-8a43-a993aa67d57c': new TariffCard({title:"Podatek", unrest:2, populationMultiplier:1, pillarsMultiplier:1, taxMultiplier:1}),
    '2110cd05-935c-4737-b8d3-1e8d0ec9390b': new TariffCard({title:"Podatek", unrest:2, populationMultiplier:1, pillarsMultiplier:1, taxMultiplier:1}),
}