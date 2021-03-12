let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let lineIndex = 0
let n // # of elements
let k // element to search for

rl.on('line', function (line) {

  if (lineIndex == 0) {

    n = parseInt(line)

  } else if (lineIndex == 1) {

    k = parseInt(line)

  } else {

    const inputArray = line.split(' ').map(el => parseInt(el))
    const sortedArray = mergeSort(inputArray)

    const indexOfKinSortedArray

    rl.close()

  }

  lineIndex += 1

})

function mergeSort(array) {
  const arrayLength = array.length
  if (arrayLength == 1) { return array } // base case

  const half = Math.floor(arrayLength / 2)

  // sort left & right halves recursively
  const left = mergeSort(array.slice(0, half))
  const right = mergeSort(array.slice(half, arrayLength))

  const leftLength = left.length
  const rightLength = right.length

  let indexLeft = 0
  let indexRight = 0
  let indexResult = 0

  let result = new Array(arrayLength)

  // merge the results
  while (indexLeft < leftLength && indexRight < rightLength) {
    if (left[indexLeft] <= right[indexRight]) {
      result[indexResult] = left[indexLeft]
      indexLeft++
    } else {
      result[indexResult] = right[indexRight]
      indexRight++
    }
    indexResult++
  }

  // if one of the arrays still has elements left
  while (indexLeft < leftLength) {
    result[indexResult] = left[indexLeft]
    indexLeft++
    indexResult++
  }

  while (indexRight < rightLength) {
    result[indexResult] = right[indexRight]
    indexRight++
    indexResult++
  }

  return result
}

// returns index of the number if found, or -1 if not found
function binarySearch(array, numberToFind, indexLeft, indexRight) {
  if (indexRight <= indexLeft) {
    return -1
  }

  const indexMiddle = Math.floor((indexLeft + indexRight) / 2)
  const valueMiddle = array[indexMiddle]

  if (valueMiddle == numberToFind) { // found
    return indexMiddle
  } else if (numberToFind < valueMiddle) {
    return binarySearch(array, numberToFind, indexLeft, indexMiddle)
  } else {
    return binarySearch(array, numberToFind, indexMiddle + 1, indexRight)
  }
}