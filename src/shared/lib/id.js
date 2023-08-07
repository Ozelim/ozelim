function getId(length) {
  const randomNumbers = Array.from({ length }, () => Math.random() * 100 + 1);
  return randomNumbers;
}


export { getId }