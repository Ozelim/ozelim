import React from 'react'
import { pb } from '../api/pocketbase'

export const useAuth = () => {

  const [user, setUser] = React.useState(pb.authStore.model ?? null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    pb.collection("users").subscribe(pb.authStore.model?.id, (e) => {
      // both operations will trigger the authStore.onChange listener
      if (e.action == "delete") {
          pb.authStore.clear();
      } else {
        pb.authStore.save(pb.authStore.token, e.record);
        setUser(e.record)
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
