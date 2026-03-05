export const Map = await fetch("board.map")
  .then((res) => res.text())
  .catch((e) => console.error(e));