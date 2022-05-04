import "./style.scss";

import { setupGame } from "./game";

console.log("console.log from main.ts");

window.addEventListener('load', () => {
  const board = document.querySelector<HTMLTableElement>('#game .board');

  if(board === null) {
    throw Error('table.board does not exist');
  }

  setupGame(board);
});