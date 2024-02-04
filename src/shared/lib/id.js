export function getId(length) {
  const characters = '0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function arraysContainSameItemsById(array1, array2) {
  return array1.filter(item1 => array2.some(item2 => item1.id === item2.id));
}

export function totalCost (array) {
  return array.reduce((sum, item) => sum + item.cost, 0)
}