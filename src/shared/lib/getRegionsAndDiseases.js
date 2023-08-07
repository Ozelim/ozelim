import { pb } from "shared/api"

async function getRegionsAndDiseas () {
  return (await pb.collection('utils').getFullList())[0]
}

export { getRegionsAndDiseas }