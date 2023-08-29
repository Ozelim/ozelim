import * as yup from 'yup'

const signupSchema = yup.object({
  name: yup.string().required('Заполните данное поле'),
  surname: yup.string().required('Заполните данное поле'),
  adress: yup.string().required('Заполните данное поле'),
  region: yup.string().required('Заполните данное поле'),
  birthday: yup.date().typeError('Выберите дату').required('Заполните данное поле'),
  phone: yup.string().required('Заполните данное поле'),
  email: yup.string().email("Неверный формат почты").required("Заполните данное поле"),
  password: yup.string().min(8, "Минимум 8 символов").max(14, "Максимум 14 символов").required("Заполните данное поле"),
})

export {
  signupSchema
}