import { Client } from 'boardgame.io/react';
import { Hex } from './Game.ts';
import { HexBoard } from './Board.tsx';

const App = Client({ 
  game: Hex,
  board: HexBoard, 
});

export default App;
