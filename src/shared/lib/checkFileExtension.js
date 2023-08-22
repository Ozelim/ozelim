function getExtension(filename) {
  return filename?.split('.')?.pop()
}

export { getExtension }