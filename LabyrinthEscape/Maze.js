//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// 
//TEST CASES 
let labyrinth = [

    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],

    ['#', '+', '+', '+', '#', '+', '+', '+', '#'],

    ['#', '+', '#', '+', '#', '+', '#', '+', '#'],

    ['+', '+', '#', '+', '0', '0', '#', '+', '#'],

    ['#', '#', '#', '+', '#', '#', '#', '+', '#'],

    ['#', '#', '+', '+', '#', '#', '#', '#', '#'],

    ['#', '+', '+', '#', '#', '#', '#', '#', '#'],

    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],

];


//Ищем наше местоположение внутри лабиринта. Фунция возвращает две кординаты x и y в форме массива
const searchStartPosition = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('0')) {
            return {x:arr[i].indexOf('0'), y:i};
        }
    }
}

//Функция возвращает вертикальный срез по оси y
const verticalSlice = (arr, slice = arr[0].length - 1) => {
    return arr.map(i => i[slice])

}
// ищем точку выхода на карте. Должно возвращать пару значений в формате [x, y], в соответсвие с осями x & y
const searchExit = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[0].includes('+')) {
            return {x:arr[i].indexOf('+'), y:i}
        } else if (arr[arr.length - 1].includes('+')) {
            return {x:arr[arr.length - 1].indexOf('+'), y:arr.length - 1}
        } else if (verticalSlice(arr).includes('+')) {
            return {x:arr.length, y:verticalSlice(arr).indexOf('+')}
        } else return {x:i, y:verticalSlice(arr, 0).indexOf('+')}
    }
}


//-------------------------------------------------------------------------------------------------------------------------------------
function checkPath(start, end, path=[]) {
    let siblings = getValidSib(start);
    labyrinth[start.y][start.x] = 5;
    if(siblings.length>1){
        console.log(siblings.length)
    }
 //<--- помечаем нашу стартовую позицию как уже пройденную. Пусть по-умолчанию это будет цифра 5.
    // проверяем, если нам куда шагать
    if (siblings.length > 0) {
        for (let i = 0; i < siblings.length; i++) {
            path.push(siblings[i].path);
            let current = siblings[i];
            // console.log(`CURRENT:`, current, "PAST AROUND", siblings)
            let isSolved = current.x === end.x && current.y === end.y;
            let notVisited = labyrinth[current.y][current.x] !== 5;
            // console.log(path)
            if (isSolved || (notVisited && checkPath(current, end, path))) {
                return path;
            }
        }
    } 
    if(siblings.length === 0) {
        // console.log('is emtty')
        path.splice(0,path.length)
    }
    return false;
}

function getValidPath(currentChoice) {
    let navigation = [];
    navigation.push(currentChoice);
    return navigation;
}

function getValidSib(cord) {
    let {
        x,
        y
    } = cord;
    let cords = [] //<--сюда пушим все координаты, на который мы можем походить. 
    //проверяем можем ли мы пошагать на заданную клетку или не можем.
    if (labyrinth[y - 1] !== undefined) {
        cords.push({
            x: x,
            y: y - 1,
            value: labyrinth[y - 1][x],
            path: 'top'
        })
    }
    if (labyrinth[y + 1] !== undefined) {
        cords.push({
            x: x,
            y: y + 1,
            value: labyrinth[y + 1][x],
            path: 'bottom'
        })
    }
    if (labyrinth[x - 1] !== undefined) {
        cords.push({
            x: x - 1,
            y: y,
            value: labyrinth[y][x - 1],
            path: 'left',

        })
    }
    if (labyrinth[x] !== undefined) {
        cords.push({
            x: x + 1,
            y: y,
            value: labyrinth[y][x + 1],
            path: 'right',

        })
    }
    return cords.filter(el => el.value === '+') // <---- функция возвращает варианты, куда мы можем походить
}
console.log(checkPath(searchStartPosition(labyrinth), searchExit(labyrinth)))



























