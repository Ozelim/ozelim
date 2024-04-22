import React from 'react'
import { pb } from '../api/pocketbase'

async function getUser (userId) {
  return await pb.collection('users').getOne(userId, {
    expand: 'sponsor'
  })
}

export const useAuth = () => {

  const [user, setUser] = React.useState(pb.authStore.model ?? null)
  const [loading, setLoading] = React.useState(true)

  function handleUser () {
    getUser(pb.authStore.model?.id)
    .then((res) => {
      setUser(res)
    })
  }

  React.useEffect(() => {
    handleUser()
    pb.collection("users").subscribe(pb.authStore.model?.id, (e) => {
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
