import { pb } from "shared/api"
import { getId } from "shared/lib";
import * as yup from 'yup'

const companySchema = yup.object({
  bin: yup.string().required('Заполните данное поле'),
  name: yup.string().required('Заполните данное поле'),
  region: yup.string().required('Заполните данное поле'),
  phone: yup.string().required('Заполните данное поле'),
  email: yup.string().email("Неверный формат почты").required("Заполните данное поле"),
  password: yup.string().min(8, "Минимум 8 символов").max(25, "Максимум 25 символов").required("Заполните данное поле"),
})

async function signupCompany (data) {

  try {

    return await pb.collection('agents').create({
      ...data, 
      passwordConfirm: data?.password,
      id: getId(15),
      emailVisibility: true,
      company: true,
      sponsor: 111924111111111
    })

  } catch (err) {
    throw err
  }
}

export {
  companySchema,
  signupCompany,
}