import { pb } from '../api/pocketbase'

const getImageUrl = (record, path, params) => {
  if (!record || !path) return ''
  return pb.files.getURL(record, path, {...params})
  
}

export { getImageUrl }