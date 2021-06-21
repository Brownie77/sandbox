// `0` - start position
// `+` - way
// `#` - wall
//1. search start position - done! - фунция searchStartPosition возвращает массив, содержащий два числа. первое число - индекс по
// вертикали, второе число индекс.
// search exit - ищем выход в виде "+"- done! ищет в верхнем и нижнем массиве. 
// НАДО написать функцию search element, она принимает два параметра - координату х и координату y
//2. В функицию searchWay вторым параметром передается колбэк. В вызов фунции мы можем передвать функции searchStartPosition или searchExit без изменений функционала.

let labyrinth = [

    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],

    ['#', '+', '+', '+', '#', '+', '+', '+', '#'],

    ['#', '+', '#', '+', '#', '+', '#', '+', '#'],

    ['+', '+', '#', '+', '0', '+', '#', '+', '#'],

    ['#', '#', '#', '+', '#', '#', '#', '#', '#'],

    ['#', '#', '+', '+', '#', '#', '#', '#', '#'],

    ['#', '#', '+', '#', '#', '#', '#', '#', '#'],

    ['#', '#', '#', '#', '#', '#', '#', '#', '#'],

];
//ищем нашу начальную позицию
const searchStartPosition = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('0')) {
            return [arr[i].indexOf('0'), i];
        }
    }
}
//Делаем вертикальные срезы. Теперь у нас есть горизонтальные и вертикальные срезы.
const verticalSlice = (arr, slice = arr[0].length - 1) => {
    return arr.map(i => i[slice])

}
// ищем точку выхода на карте. Должно возвращать пару значений в формате [x, y], в соответсвие с осями x & y
const searchExit = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[0].includes('+')) {
            return [arr[i].indexOf('+'), i]
        } else if (arr[arr.length - 1].includes('+')) {
            return [arr[arr.length - 1].indexOf('+'), arr.length - 1]
        } else if (verticalSlice(arr).includes('+')) {
            return [arr.length, verticalSlice(arr).indexOf('+')]
        } else return [i, verticalSlice(arr, 0).indexOf('+')]
    }
}
//SetNavigation необходимо для апдейта объекта navigation внутри функции searchWay
const setNavigation = (currentPosition) => {
    return {
        top: [currentPosition[0], currentPosition[1] - 1],
        right: [currentPosition[0] + 1, currentPosition[1]],
        down: [currentPosition[0], currentPosition[1] + 1],
        left: [currentPosition[0] - 1, currentPosition[1]],
    }
};
//ищем соседние точки сверху, слева, справа и снизу от заданной точки координат, которые содержат проход - '+'. 
//Принимает первым параментром двумерный массив, второй параметр принимает колбэк, который возвращает пару значений в формате [x,y] - наши первоночальные координаты.
const searchWay = (arr, startPos, setNav) => {
    let currentPosition = startPos(arr); //<---можно потом перезаписать, с новой точкой.
    const startPosition = searchStartPosition(arr)
    let [x, y] = currentPosition;
    let way = [];
    let navigation = {
        top: [currentPosition[0], currentPosition[1] - 1],
        right: [currentPosition[0] + 1, currentPosition[1]],
        down: [currentPosition[0], currentPosition[1] + 1],
        left: [currentPosition[0] - 1, currentPosition[1]],

    };

    function array_compare(a, b) {
        // if lengths are different, arrays aren't equal
        if (a.length != b.length)
            return false;

        for (j = 0; j < a.length; j++)
            if (a[j] != b[j])
                return false;

        return true;
    }

    arr[y][x] = '1' //<---- обозначаем текущую клетку как пройденную
    currentPosition = Object.values(navigation).filter(coordinates => arr[coordinates[1]][coordinates[0]] == '+').flat()
    navigation = setNav(currentPosition);
    [x, y] = currentPosition;
    // console.log(currentPosition)
    // console.log(navigation)
    for (var i = 0; i < Object.values(navigation).length; i++) {
        while (!array_compare(startPosition, Object.values(navigation)[i])) {
            currentPosition = Object.values(navigation).filter(coordinates => arr[coordinates[1]][coordinates[0]] == '+').flat()
            navigation = setNav(currentPosition);
            [x, y] = currentPosition;
            console.log(currentPosition)
            console.log(navigation)
        }
    }
}

console.log(searchWay(labyrinth, searchExit, setNavigation));