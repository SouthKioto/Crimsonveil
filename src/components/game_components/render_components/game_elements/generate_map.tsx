
const getRandomThreValuableRow = (width: number): number[] => {
  const row: number[] = [];

  for (let i = 0; i <= width; i++) {
    row.push(Math.floor(Math.random() * 32) + 1);
  }

  return row;

}

export const generate_map = (width: number, height: number): number[][] => {

  const array: number[][] = []

  while (array.length < height) {
    array.push(getRandomThreValuableRow(width))
  }

  return array;
}

