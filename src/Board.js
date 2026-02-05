import React from 'react';
import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Hex,
} from "react-hexgrid";
import './Board.css';

const REGIONS =
{
  0: "ro",
  1: "gr",
  2: "fr",
  3: "es",
}

export function HexBoard({ ctx, G, moves }) {
  //const onClick = (id) => moves.clickCell(id);


  function getRandomInt(max) {
    return "pat-"+Math.floor(Math.random() * max);
  }

  function getRandomRegion(max) {
    return REGIONS[Math.floor(Math.random() * max)];
  }

  let tbody = [];
  for (let i = 0; i < 22; i++) {
    for (let j = 0; j < 11; j++) {

      const cell = G.cells[i][j];
      if (cell !== null)
      {
        tbody.push(
          <Hexagon q={i} r={j-Math.floor(i/2)} s={0} className={REGIONS[cell]} />
        );
        // fill={getRandomInt(6)}
      }
    }
  }

  return (
    <div>
      <HexGrid width={1200} height={800} viewBox="-50 -50 100 100">
        <Layout
            size={{ x: 4, y: 4 }}
            flat={true}
            spacing={1.1}
            origin={{ x: -70, y: -45 }}
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
    </div>
  );
}