function formatNumber(number) {
  // Convert the number to a string

  const numberString = number?.toString();

  // Use regular expression to add spaces for thousands separator
  const formattedNumber = numberString?.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return formattedNumber;
}

export {
  formatNumber
}