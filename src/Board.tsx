import {
  HexGrid,
  Layout,
  Hexagon,
  //Text,
  Pattern,
  //Hex,
} from "react-hexgrid";
import 'reactjs-popup/dist/index.css';
import './Board.css';
import './model/Types.ts';
import { TradeTokens, BuildingTypes, PlayerInfo } from './data/Dictionary.ts';
import { BuildingType, Cell, ResourceType } from './model/Types.ts';
import { HexGame } from "./model/HexGame.ts";
import { BoardProps } from "boardgame.io/dist/types/packages/react";
import Popup from "reactjs-popup";
import { canBuild } from "./Game.ts";
import { Card, DeckType, DeckTypeNames } from "./model/Card.ts";
import { cardDictionary } from "./data/CardDictionary.ts";
import { useRef, useState } from "react";

const REGIONS: { [regionId: number]: string } =
{
  0: "ro",
  1: "gr",
  2: "fr",
  3: "es",
  4: "tr",
  5: "eg",
  6: "mo",
}

enum State {
  Normal,
  Build,
}

export interface HexBoardProps extends BoardProps<HexGame> { }

export const HexBoard: React.FC<HexBoardProps> = ({ ctx, G, moves, events }) => {
  function onClick(event: any, source: any) {
    if (state !== State.Build)
      return;

    const hex = source.state.hex;
    moves.build(hex.q, hex.r + Math.floor(hex.q / 2), buildType);
    setState(State.Normal);
  }
  function onProduce(type: ResourceType) {
    moves.produce(type);
  }

  const [state, setState] = useState(State.Normal);
  const [buildType, setBuildType] = useState(BuildingType.City);
  const [currentPlayer, setCurrentPlayer] = useState("0");
  const [currentTurn, setCurrentTurn] = useState(0);

  if (ctx.currentPlayer !== currentPlayer || ctx.turn !== currentTurn) {
    setState(State.Normal);
    setCurrentPlayer(ctx.currentPlayer);
    setCurrentTurn(ctx.turn);
  }

  // function getRandomInt(max : number)
  // {
  //   return "pat-" + Math.floor(Math.random() * max);
  // }

  // function getRandomRegion(max : number)
  // {
  //   return REGIONS[Math.floor(Math.random() * max)];
  // }
  const PopupExample = () => (
    <Popup trigger={<input type="image" src="StrategyGameIcons/Paper.png" alt="Produce" className="small-btn" />} position="right center">
      <div>{State[state]}</div>
    </Popup>
  );

  const BuildAction = () => {
    const ref = useRef(null);

    function onBuild(type: BuildingType) {
      setState(State.Build);
      setBuildType(type);
      ref.current.close();
    }

    let tbuildings = [];
    for (let i = 0; i < BuildingType.Wonder; i++) {
      tbuildings.push(
        <div className="menu-item" onClick={() => onBuild(i)}>
          {BuildingType[i]} &#40;{availableBuildings[i]}&#41;<br />
        </div>
      );
    }

    return (
      <div>
        <Popup
          trigger={<button>Buduj</button>}
          ref={ref}
          position="right bottom"
          on="click"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: '0px', border: 'none' }}
          arrow={false}
        >
          <div className="menu">
            {tbuildings}
          </div>
        </Popup>
    </div>);
  };

  function getHexClass(x, y, cell : Cell) : string {
    switch (state) {
      case State.Build:
        if (canBuild(G, [x, y], ctx.currentPlayer, buildType))
          return "available"

        return (cell.building !== undefined ? "taken" : "unavailable");

      default:
        return "";
    }
  }

  let tbody = [];
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 14; j++) {

      const cell = G.cells[i][j];
      if (cell !== null) {
        let hexClass = getHexClass(i, j, cell);

        tbody.push(
          // <div className={canBuild(G, [i, j], ctx.currentPlayer, BuildingType.Farm) ? "available" : ""}>
          <Hexagon q={i} r={j - Math.floor(i / 2)} s={0} className={REGIONS[cell.regionId] + " " + hexClass} onClick={(e, h) => onClick(e, h)}>
            {cell.building !== undefined
              ? (
                <image href={BuildingTypes[cell.building.type].image}
                  filter={PlayerInfo[cell.building.ownerId].filter}>
                  <title>{BuildingTypes[cell.building.type].title + " " + PlayerInfo[cell.building.ownerId].title}</title>
                </image>
              ) : (
                  <image href={cell.resourceId >= 0 ? TradeTokens[cell.resourceId].image : null}>
                    <title>
                      {cell.resourceId >= 0 ? TradeTokens[cell.resourceId].title : null}
                    </title>
                  </image>
              )}
            {/* <text color="red">{canBuild(G, [i, j], ctx.currentPlayer, BuildingType.Farm) ? "Y" : i + "," + j}</text> */}
          </Hexagon>
        );
      }
    }
  }

  var resources = G.players[ctx.currentPlayer].resources;
  var availableBuildings = G.players[ctx.currentPlayer].availableBuildings;

  let tresources = [];
  for (let i = 0; i < ResourceType.Count; i++) {
    const isPrimary = i < ResourceType.Money;

    tresources.push(
      <>
        {isPrimary ? (
          <>
            {ResourceType[i]}: {resources[i].value} (+{resources[i].production})
            <input type="image" src="StrategyGameIcons/Tools.png" alt="Produce" className="small-btn" onClick={(_) => onProduce(i)}></input>
          </>
        ) : (
          <>{ResourceType[i]}: {resources[i].value}</>
        )}
        <br />
      </>
    );
  }

  tresources.push(
    <div>
      <PopupExample /><br />
    </div>
  );

  let tmarket = renderMarket(G);

  return (
    <div>
      <table>
        <tr>
          <td>
            <HexGrid width={1010} height={670} viewBox="-50 -50 55 84">
              <Layout
                size={{ x: 3, y: 3 }}
                flat={true}
                spacing={1.1}
                origin={{ x: -82, y: -46 }}
                className="board"
              >
                {tbody}
              </Layout>

              <Pattern id="pat-0" link="https://placecats.com/59/59" />
              <Pattern id="pat-1" link="https://placecats.com/60/60" />
              <Pattern id="pat-2" link="https://placecats.com/61/61" />
              <Pattern id="pat-3" link="https://placecats.com/62/62" />
              <Pattern id="pat-4" link="https://placecats.com/63/63" />
              <Pattern id="pat-5" link="https://placecats.com/64/64" />
              <Pattern id="pat-6" link="https://placecats.com/65/65" />
            </HexGrid>
          </td>
          <td>
            {tmarket}
          </td>
        </tr>
      </table>
      <br />
      <table>
        <tr>
          <td>
            {tresources}
          </td>
          <td>
            <BuildAction />
          </td>
        </tr>
      </table>
    </div>
  );
}

export default HexBoard;

function renderMarket(G: HexGame) : any[] {
  const result = [];

  for (let type = 0; type < DeckType.Count; type++) {
    const market = G.market[type];
    result.push(<b>{DeckTypeNames[type]}</b>)
    result.push(<br/>)

    for (let i = 0; i < market.length; i++) {
      if (market[i] === undefined)
        continue;

      const card: Card = cardDictionary[market[i]];

      result.push(
        <>
          <button className="card"><b>{card.title}</b>:<br /> {card.description}</button>
        </>
      );
    }
    result.push(<br />);
  }

  return result;
}
