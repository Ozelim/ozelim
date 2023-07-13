import { pb } from "shared/api"

async function signupWithLink (data) {
  try {
    return await pb.collection('users').create(data)
  } catch (err) {
    console.log(err.meesage);
  }
}

export { signupWithLink }