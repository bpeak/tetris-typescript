const block = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
]

console.log(block)
console.log(rotate(block))

function rotate(matrix) {
  let result = [];
  for(let i = 0; i < matrix[0].length; i++) {
      let row = matrix.map(e => e[i]).reverse();
      result.push(row);
  }
  return result;
};