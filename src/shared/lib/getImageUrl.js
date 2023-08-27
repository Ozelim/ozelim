import { pb } from '../api/pocketbase'

const getImageUrl = (record, path, params) => {
  if (!record || !path) return ''
  return pb.getFileUrl(record, path, {...params})
  
}

export { getImageUrl }