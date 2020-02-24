

let alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];


function toCaesar(str, step) {
    let strToArr = str.split(''); //разделили строчку на массив букв
    let encryptedArr = [];

    strToArr.forEach((element) => { //на каждый элемент нового массива применяем функцию

        if (alphabet.indexOf(element) !== -1 && (alphabet.indexOf(element) + step) < alphabet.length) {

            let currentIndex = alphabet.indexOf(element);
            let newIndex = currentIndex + step;
            encryptedArr.push(alphabet[newIndex]);
        } else if (alphabet.indexOf(element) !== -1 &&  (alphabet.indexOf(element) + step)  > alphabet.length) {
            let currentIndex = alphabet.indexOf(element);
            let newIndex = currentIndex + step;
            newIndex = newIndex - (alphabet.length);
            encryptedArr.push(alphabet[newIndex]);
        } else {
            console.log("Проверьте регистр введенных данных и язык");

        }

    });
    let arrToStr = encryptedArr.join('');
    console.log(arrToStr);

}

toCaesar('нужнаработа', 4);
