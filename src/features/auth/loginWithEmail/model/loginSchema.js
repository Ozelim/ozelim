import * as yup from 'yup'

const loginSchema = yup.object({
  email: yup.string().email("Неверный формат почты").required("Заполните данное поле"),
  password: yup.string().min(8, "Минимум 8 символов").max(14, "Максимум 14 символов").required("Заполните данное поле"),
})

export {
  loginSchema
}