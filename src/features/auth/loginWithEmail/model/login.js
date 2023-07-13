import { pb } from "shared/api";

async function loginWithEmail (data) {
  try {
    return await pb.collection('users').authWithPassword(
      data.email,
      data.password
    )
  } catch (err) {
    console.log(err?.message);
  }
}

export { loginWithEmail }