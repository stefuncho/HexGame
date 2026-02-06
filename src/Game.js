const map = await fetch("board.map")
  .then((res) => res.text())
  .then((text) =>
  {
    var board = Array(24).fill().map(entry => Array(11).fill(null));

    text.split("\n").forEach(
      cellData => 
      {
        if (cellData.length < 4 || cellData[0] === '\\' || cellData[0] === '/')
          return;

        var cell = cellData.split(' ').map((a, _b, _c) => Number.parseInt(a));
        board[cell[0]][cell[1]] = cell[2];
      }
    );
    return board;
  })
  .catch((e) => console.error(e));

export const Hex = {
  setup: () => 
  {
    return { cells: map };
  },

  moves: {
    clickCell: ({ G, playerID }, id) =>
    {
      G.cells[id] = playerID;
    },
  },
};