const width = 4;
const height = 4;

type coord = [number, number];

const initBoard = function(): [HTMLTableSectionElement, HTMLTableCellElement[][]] {
  const cells: HTMLTableCellElement[][] = [];
  const tbody = document.createElement('tbody');

  for(let i = 0; i < height; i++) {
    const tr = document.createElement('tr');
    cells[i] = [];

    for(let j = 0; j < width; j++) {
      const td = document.createElement('td');

      cells[i][j] = td;
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  return [tbody, cells];
}

const render = function(cells: number[][], tableCells: HTMLTableCellElement[][]): void {
  for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
      tableCells[i][j].textContent = (cells[i][j] === 0 ? '' : '' +cells[i][j]);
    }
  }
}

const setupGame = function(board: HTMLTableElement) {
  const [tbody, tableCells] = initBoard();
  board.appendChild(tbody);

  const cells = new Array(4).fill(0).map((_, i) => new Array(4).fill(0).map((_, j) => i * width + j));
  render(cells, tableCells);

  const move = function(i: number, j: number): void {
    if(0 < i && cells[i - 1][j] === 0) {
      // swap up
      cells[i - 1][j] = cells[i][j];
    } else if(i < width - 1 && cells[i + 1][j] === 0) {
      // swap down
      cells[i + 1][j] = cells[i][j];
    } else if(0 < j && cells[i][j - 1] === 0) {
      // swap left
      cells[i][j - 1] = cells[i][j];
    } else if(j < height - 1 && cells[i][j + 1] === 0) {
      // swap right
      cells[i][j + 1] = cells[i][j];
    } else {
      return;
    }

    cells[i][j] = 0;
    render(cells, tableCells);
  }

  // shuffle
  for(let i = 0; i < 100000; i++) {
    const id = Math.floor(Math.random() * width * height);
    move(Math.floor(id / width), id % width);
  }

  for(let i = 0; i < height; i++) {
    for(let j = 0; j < width; j++) {
      tableCells[i][j].addEventListener('click', () => {
        move(i, j);
      });
    }
  }
}

export {
  setupGame
}