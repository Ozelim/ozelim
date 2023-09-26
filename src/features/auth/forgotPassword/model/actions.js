import { pb } from 'shared/api'

async function sendPasswordReset (email) {
  try {
    return await pb.collection('users').requestPasswordReset(email)
  } catch (err) {
    throw err
  }
}

async function resetPassword (token, password, passwordConfirm) {
  try {
    return await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm)
  } catch (err) {
    throw err
  }
}

export { sendPasswordReset, resetPassword }