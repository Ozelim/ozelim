import Pocketbase from 'pocketbase'

const pb = new Pocketbase(import.meta.env.VITE_APP_POCKETBASE_URL_DEV)

pb.autoCancellation(false)

export {
  pb
}
