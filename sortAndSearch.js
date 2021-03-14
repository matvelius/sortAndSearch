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

  if (indexLeft == indexRight) {
    return -1
  }

  const midIndex = Math.floor((indexRight + indexLeft) / 2)
  const midValue = array[midIndex]

  if (midValue == numberToFind) { return midIndex }

  let unsortedIndexLeft
  let unsortedIndexRight

  if (array[indexLeft] < midValue) { // first half is sorted!
    // indexLeft = 0
    indexRight = midIndex

    unsortedIndexLeft = midIndex + 1
    unsortedIndexRight = n - 1
  } else { // second half is sorted!
    indexLeft = midIndex + 1
    indexRight = n - 1

    unsortedIndexLeft = 0
    unsortedIndexRight = midIndex
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
    return modifiedBinarySearch(array, numberToFind, unsortedIndexLeft, unsortedIndexRight)
  }

}

// returns index of the number if found, or -1 if not found
function binarySearch(array, numberToFind, indexLeft, indexRight) {
  if (indexLeft == indexRight) {
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

// console.log(modifiedBinarySearch([14, 56, 843, -2, 1, 4], 57, 0, 5))