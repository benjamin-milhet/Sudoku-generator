let _size = 9;
let _grille = [];

function initTab() {
  for (let i = 0; i < _size; i++) {
    _grille[i] = [];
  }
  for (let i = 0; i < _size; i++) {
    for (let j = 0; j < _size ; j++) {
      _grille[i][j] = 0
    }
  }
}

function isPlaceable_row(n, x) {
  for (let row = 0; row < _size; row++) {
    if (_grille[x][row] == n) return false;
  }
  return true;
}

function isPlaceable_column(n, y) {
  for (let col = 0; col < _size; col++){
    if (_grille[col][y] == n) return false;
  }
  return true;
}

function isPlaceable_square(n, x, y) {
    let nb = Math.sqrt(_size);

    let _x = x-(x%nb);
    let _y = y-(y%nb);

    for (let row = _x; row < _x+nb; row++) {
      for (let col = _y; col < _y+nb; col++) {
        if (_grille[row][col] == n) return false;
      }
    }

    return true;
}

initTab();
isPlaceable_row(2,1);
isPlaceable_column(2,1);
isPlaceable_square(2,1);

console.log(_grille);
