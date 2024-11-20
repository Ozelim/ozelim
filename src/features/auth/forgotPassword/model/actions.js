import { pb } from 'shared/api'

async function sendPasswordReset (user, email) {
  try {
    pb.authStore.clear();
    return await pb.collection(user === 'user' ? 'users' : 'agents').requestPasswordReset(email)
  } catch (err) {
    throw err
  }
}

async function resetPassword (user, token, password, passwordConfirm) {
  try {
    pb.authStore.clear();
    return await pb.collection(user === 'user' ? 'users' : 'agents').confirmPasswordReset(token, password, passwordConfirm)
  } catch (err) {
    throw err
  }
}

export { sendPasswordReset, resetPassword }