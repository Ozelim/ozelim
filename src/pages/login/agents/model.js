import { pb } from "shared/api"
import { getId } from "shared/lib";
import * as yup from 'yup'

const agentSchema = yup.object({
  iin: yup.string().required('Заполните данное поле').min(12, 'Введите 12 цифр').max(12, 'Введите 12 цифр'),
  fio: yup.string().required('Заполните данное поле'),
  region: yup.string().required('Заполните данное поле'),
  phone: yup.string().required('Заполните данное поле'),
  email: yup.string().email("Неверный формат почты").required("Заполните данное поле"),
  password: yup.string().min(8, "Минимум 8 символов").max(25, "Максимум 25 символов").required("Заполните данное поле"),
})

async function signupAgent (data) {

  try {

    // const sponsor = await pb.collection('users').getOne(data?.sponsor)

    // if (!sponsor?.verified) {
    //   throw 'unverified'
    // }

    return await pb.collection('agents').create({
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

export {
  agentSchema,
  signupAgent,
}