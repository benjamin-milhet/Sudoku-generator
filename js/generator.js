let _size = 9;
let _grille = [];
let _grilleSoluce = [];
let _lvl = 1;

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

function isValid(n, x, y) {
  if (_grille[x][y] == 0) {
    if (isPlaceable_row(n, x) && isPlaceable_column(n, y) && isPlaceable_square(n, x , y)) return true;
  }
  return false;
}

function isEmpty(row, col) {
    if (_grille[row][col] == 0) {
      return true;
    }
    return false;
}

function setSoluce() {
    _grille = _grilleSoluce;
}

function resolve(position) {
    if (position == (_size*_size)) return true;
    let row = parseInt(position/_size,10);
    let col = parseInt(position%_size, 10);

    if (!isEmpty(row, col)) return resolve(position+1);

    let v = [];
    for (let i = 1; i < _size+1; i++) v.push(i);

    v = shuffle(v);

    for (let i = 0; i < _size; i++) {
        if (isValid(v[i], row, col)) {
            _grille[row][col] = v[i];

            if (resolve(position+1)) return true;
            _grille[row][col] = 0;
        }
    }
    return false;
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getDifficulty() {
      let res = 0;
      switch (_lvl) {
        case 1:
          res = _size*_size*0.3;
          break;
        case 2:
          res = _size*_size*0.4;
          break;
        case 3:
          res = _size*_size*0.5;
          break;
        case 4:
          res = _size*_size*0.6;
          break;
        case 5:
          res = _size*_size*0.7;
          break;
        default:
          res = _size*_size*0.3;
          break;
      }

      return res;
    }

function generateGrid(reste) {
    let N = reste;
    if (N > 0) {
      let row = getRandomInt(_size);
      let col = getRandomInt(_size);
      if (_grille[row][col] != 0) {
          _grille[row][col] = 0;
          N--;
      }
      generateGrid(N);
    }
}



initTab();
resolve(0);
_grilleSoluce = _grille;
generateGrid(getDifficulty(_lvl));

console.log(_grille);
