import { Client } from 'boardgame.io/react';
import { Hex } from './Game';
import { HexBoard } from './Board';

const App = Client({ 
  game: Hex,
  board: HexBoard, 
});

export default App;
