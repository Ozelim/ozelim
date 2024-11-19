import React from 'react'
import { pb } from '../api/pocketbase'

async function getUser (userId, type) {
  if (!userId) return 

  if (type === 'users') return await pb.collection(type).getOne(userId, {expand: 'sponsor'})
  if (type === 'agents') return await pb.collection(type).getOne(userId, {expand: `creeps.creeps.creeps, sponsor`})
}

export const useAuth = () => {

  const [user, setUser] = React.useState(pb.authStore.model ?? null)
  const [loading, setLoading] = React.useState(true)

  function handleUser () {
    getUser(pb.authStore.model?.id, pb.authStore?.model?.collectionName)
    .then((res) => {
      setUser(res)
    })
  }

  React.useEffect(() => {
    handleUser()
    pb.collection(pb.authStore?.model?.collectionName).subscribe(pb.authStore.model?.id, (e) => {
      // both operations will trigger the authStore.onChange listener
      if (e.action == "delete") {
          pb.authStore.clear();
      } else {
        pb.authStore.save(pb.authStore.token, e.record);
        handleUser()
      }
  });
  }, []);

  React.useEffect(() => {
    setLoading(false)
  }, [user])

  return {
    // ...pb.authStore,
    user,
    setUser,
    loading
  }
}
