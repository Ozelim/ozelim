import * as yup from 'yup'

const signupSchema = yup.object({
  email: yup.string().email("Неверный формат почты").required("Почта обязательна для заполнения"),
  password: yup.string().min(8, "Минимум 8 символов").max(14, "Максимум 14 символов").required("Пароль обязателен для заполнения"),
})

export {
  signupSchema
}