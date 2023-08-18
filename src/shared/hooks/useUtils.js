import React from 'react'
import { pb } from 'shared/api';

async function getRegionsAndDiseases() {
  return (await pb.collection("utils").getFullList())[0]
}

export const useUtils = () => {

  const [data, setData] = React.useState({})

  React.useEffect(() => {
    getRegionsAndDiseases()
    .then(res => {
      setData(res)
    })
  }, [])

  return {
    regions: data?.regions ?? [],
    diseases: data?.diseases ?? [],
    record: data
  }
}
