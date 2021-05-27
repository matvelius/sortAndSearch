// ID успешной посылки: 

// ПРИНЦИП РАБОТЫ

// Самое главное, что нужно заметить в этой задаче, на мой взгляд - это то что
// данный массив уже отсортирован, и всего-лишь сдвинут индекс начала последовательности. 
// Соответственно моё решение сначала делит массив пополам, чтобы понять какая часть 
// отсортирована и находится ли в ней искомое число: если да, то далее производится 
// обычный бинарный поиск в отсортированной части, а если нет, то мы начинаем процесс 
// сначала с неотсортированой частью и продолжаем его до тех пор, пока индексы левой и
// правой сторон массива не пересекутся.

// ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

// Чтобы определить отсортирована ли уже левая или правая часть массива достаточно
// сравнить крайний левый элемент с тем, что расположен посередине. Так как мы знаем,
// что массив уже отсортирован (и просто сдвинут индекс первого элемента), левая часть
// должна быть осорнирована если крайний левый элемент меньше элемента посередине.
// Иначе мы можем с уверенностью заключить, что отсортирована правая часть.

// ВРЕМЕННАЯ СЛОЖНОСТЬ

// Временная сложность O(log(n)) гарантируется тем, что основное время занимает простой
// бинарный поиск (чья временная сложность как раз и есть O(log(n))), а деление массива
// пополам до начала бинарного поиска произойдет не более 13 раз если в изначальном
// массиве не более 10,000 чисел, и эта часть алгоритма имеет костантную зависимость и
// не добавляет значительного времени.

// ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

// Так как бинарный поиск реализован рекурсивно, пространственная сложность тоже O(log(n)).
// Если использовать итерацию, то пространственную сложность можно уменьшить до O(1), но это
// не являлось одним из требований задачи.

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineIndex = 0
let n // # of elements
let k // element to search for

let indexLeft = 0
let indexRight

rl.on('line', function (line) {

  if (lineIndex == 0) {

    n = parseInt(line)
    indexRight = n - 1

  } else if (lineIndex == 1) {

    k = parseInt(line)

  } else {

    const inputArray = line.split(' ').map(el => parseInt(el))

    if (n == 0) {
      console.log(-1)
      rl.close()
      return
    } else if (n == 1) {
      console.log(inputArray[0] == k ? 0 : -1)
      rl.close()
      return
    }

    console.log(modifiedBinarySearch(inputArray, k, indexLeft, indexRight))

    rl.close()

  }

  lineIndex += 1

})

function modifiedBinarySearch(array, numberToFind, indexLeft, indexRight) {

  while (indexLeft != indexRight) {

    let midIndex = Math.floor(indexLeft + (indexRight - indexLeft) / 2)
    if (indexRight - indexLeft == 1) { // only 2 elements
      return binarySearch(array, numberToFind, indexLeft, indexRight)
    }
    const midValue = array[midIndex]

    if (midValue == numberToFind) { return midIndex }

    let unsortedIndexLeft
    let unsortedIndexRight

    if (array[indexLeft] < midValue) { // first half is sorted!
      unsortedIndexLeft = midIndex + 1
      unsortedIndexRight = indexRight

      indexRight = midIndex
    } else { // second half is sorted!
      unsortedIndexLeft = 0
      unsortedIndexRight = midIndex

      indexLeft = midIndex + 1
    }

    if (numberToFind == array[indexLeft]) { return indexLeft }
    if (numberToFind == array[indexRight]) { return indexRight }

    // if number is in the range of the sorted half
    if (numberToFind < array[indexRight] && numberToFind > array[indexLeft]) {
      return binarySearch(array, numberToFind, indexLeft, indexRight)
      // if number is in the unsorted half
    } else {
      if (numberToFind == array[unsortedIndexLeft]) { return unsortedIndexLeft }
      if (numberToFind == array[unsortedIndexRight]) { return unsortedIndexRight }

      if (unsortedIndexRight - unsortedIndexLeft <= 2) {
        return -1
      }

      indexLeft = unsortedIndexLeft
      indexRight = unsortedIndexRight
    }

  }

  return -1

}

// returns index of the number if found, or -1 if not found
function binarySearch(array, numberToFind, indexLeft, indexRight) {
  if (indexLeft == indexRight) {
    return -1
  }

  const indexMiddle = Math.floor(indexLeft + (indexRight - indexLeft) / 2)
  const valueMiddle = array[indexMiddle]

  if (valueMiddle == numberToFind) { // found
    return indexMiddle
  } else if (numberToFind < valueMiddle) {
    return binarySearch(array, numberToFind, indexLeft, indexMiddle)
  } else {
    return binarySearch(array, numberToFind, indexMiddle + 1, indexRight)
  }
}