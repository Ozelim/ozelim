import { pb } from "shared/api"
import { getId } from "shared/lib";

function generateRandomEmail() {
  const usernameLength = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 14 characters
  const domainLength = Math.floor(Math.random() * 5) + 5; // Random length between 5 and 9 characters
  const usernameChars = "abcdefghijklmnopqrstuvwxyz1234567890";
  const domainChars = "abcdefghijklmnopqrstuvwxyz";

  let username = '';
  let domain = '';

  // Generate random username
  for (let i = 0; i < usernameLength; i++) {
    const randomIndex = Math.floor(Math.random() * usernameChars.length);
    username += usernameChars.charAt(randomIndex);
  }

  // Generate random domain
  for (let i = 0; i < domainLength; i++) {
    const randomIndex = Math.floor(Math.random() * domainChars.length);
    domain += domainChars.charAt(randomIndex);
  }

  return `${username}@${domain}.com`;
}

async function signupWithLink (data) {

  try {

    const sponsor = await pb.collection('users').getOne(data?.sponsor)
    // .catch(() => {
    //   throw new Error('unverified')
    // })

    if (!sponsor?.verified) {
      throw 'unverified'
    }

    return await pb.collection('users').create({
      ...data, 
      // email: generateRandomEmail(),
      id: getId(15),
      emailVisibility: true,
      level: '0',
    })

  } catch (err) {
    throw err
  }
}

export { signupWithLink }