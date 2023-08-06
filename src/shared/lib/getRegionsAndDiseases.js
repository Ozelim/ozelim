const { pb } = require("shared/api");

async function getRegionsAndDiseas (regions, ) {
  return (await pb.collection('utils').getFullList())[0]
}

export { getRegionsAndDiseas }