import React from 'react';
import
{
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Hex,
} from "react-hexgrid";
import './Board.css';
import './model/Types.ts';
import { TradeTokes, BuildingTypes, PlayerInfo } from './model/Dictionary.ts';
import { BuildingType, ResourceType } from './model/Types.ts';

const REGIONS =
{
  0: "ro",
  1: "gr",
  2: "fr",
  3: "es",
  4: "tr",
  5: "eg",
  6: "mo",
}

export function HexBoard({ ctx, G, moves })
{
  function onClick(event, source) 
  { 
    var hex = source.state.hex;
    moves.build(hex.q, hex.r+Math.floor(hex.q/2), BuildingType.City);
  }

  function getRandomInt(max)
  {
    return "pat-" + Math.floor(Math.random() * max);
  }

  function getRandomRegion(max)
  {
    return REGIONS[Math.floor(Math.random() * max)];
  }

  let tbody = [];
  for (let i = 0; i < 25; i++)
  {
    for (let j = 0; j < 14; j++)
    {

      const cell = G.cells[i][j];
      if (cell !== null)
      {
        tbody.push(
          <Hexagon q={i} r={j-Math.floor(i/2)} s={0} className={REGIONS[cell.regionId]} onClick={(e, h) => onClick(e, h)}>
          {cell.building !== undefined 
            ? (
            <image href={BuildingTypes[cell.building.type].image}
              filter={PlayerInfo[cell.building.owner].filter}>
              <title>{BuildingTypes[cell.building.type].title + " " + PlayerInfo[cell.building.owner].title}</title>
            </image>
          ) : (
            <image href={cell.resourceId >= 0 ? TradeTokes[cell.resourceId].image : null}>
              <title>{cell.resourceId >= 0 ? TradeTokes[cell.resourceId].title : null}</title>
            </image>
          )}
          </Hexagon>
        );
      }
    }
  }

  var resources = G.players[ctx.currentPlayer].resources;

  return (
    <div>
      <HexGrid width={1400} height={800} viewBox="-50 -50 100 100">
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
      </HexGrid><br/>
      Kamień: { resources[ResourceType.Stone].value } (+{ resources[ResourceType.Stone].production })<br/>
      Jedzenie: { resources[ResourceType.Food].value } (+{ resources[ResourceType.Food].production })<br/>
      Idee: { resources[ResourceType.Idea].value } (+{ resources[ResourceType.Idea].production })
    </div>
  );
}