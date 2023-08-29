import { pb } from "shared/api";

async function loginWithEmail (data) {
  try {
    await pb.collection('users').authWithPassword(
      data.email,
      data.password
    )
    .then((res) => {
      return res
    })
  } catch (err) {
    throw new Error(err)
  }
}

export { loginWithEmail }