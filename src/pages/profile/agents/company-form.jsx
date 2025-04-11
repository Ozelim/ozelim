import React from 'react'
import { Button, createEmotionCache, FileButton, MantineProvider, TextInput } from '@mantine/core'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { pb } from 'shared/api'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from 'shared/hooks'
import { showNotification } from '@mantine/notifications'

const cache = createEmotionCache({
  key: 'pack-mantine',
  prepend: false,
})

const schema = yup.object().shape({
  name: yup.string().required('Обязательное поле'),
  phone: yup.string().required('Обязательное поле'),
  email: yup.string().email('Неверный формат').required('Обязательное поле'),
  whatsapp: yup.string(),
  files: yup.array(),
})

export const CompanyForm = ({ type }) => {

  const [searchParams, setSearchParams] = useSearchParams()

  const { user } = useAuth()

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [files, setFiles] = React.useState([])

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      whatsapp: '',
    },
  })

  const handleFiles = (files) => {
    setFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setError('')

      const formData = new FormData()

      files.forEach((file) => {
        formData.append('docs', file)
      })

      await pb
        .collection('company_bids')
        .create(formData)
        .then(async (res) => {
          await pb.collection('company_bids').update(res.id, {
            trusted: { ...data },
            plus: searchParams.get('pack') === 'company+' ? true : false,
            status: 'created',
            company: user?.id,
          })

          showNotification({
            title: 'Заявка отправлена',
            message: 'Заявка отправлена успешно',
            color: 'green',
          })
          setSearchParams({})
          window.location.reload()
        })
        .catch((err) => {
          setError('Произошла ошибка при отправке')
          console.error(err)
        })
    } catch (err) {
      setError('Произошла ошибка при отправке')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MantineProvider
      emotionCache={cache}
      withGlobalStyles
      withCSSVariables
      theme={{
        primaryColor: type === 'company' ? 'rose' : 'blue',
        primaryShade: type === 'company' ? 5 : 6,
        defaultRadius: 'md',
        colors: {
          rose: [
            '#fff1f2',
            '#ffe4e6',
            '#fecdd3',
            '#fda4af',
            '#fb7185',
            '#f43f5e',
            '#e11d48',
            '#be123c',
            '#9f1239',
            '#881337',
          ],
        },
      }}
    >
      <div className="container">
        <form
          className="flex flex-col gap-2 max-w-sm mx-auto shadow-equal rounded-primary p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-lg font-bold text-center">
            Заявка на корпоративный пакет {type === 'company+' ? '+' : ''}
          </p>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                required
                variant="filled"
                placeholder="Име довер. лица"
                label="Име довер. лица"
                error={errors.name?.message}
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                required
                variant="filled"
                placeholder="Номер телефона"
                label="Номер телефона"
                error={errors.phone?.message}
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                required
                variant="filled"
                placeholder="Почта"
                label="Почта"
                error={errors.email?.message}
                disabled={isSubmitting}
              />
            )}
          />
          <Controller
            name="whatsapp"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                color="pink.6"
                variant="filled"
                placeholder="WhatsApp"
                label="WhatsApp"
                error={errors.whatsapp?.message}
                disabled={isSubmitting}
              />
            )}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p className="text-sm font-medium">Документы организации</p>
              <FileButton multiple onChange={handleFiles}>
                {(props) => (
                  <Button variant="outline" compact {...props}>
                    Загрузить документы
                  </Button>
                )}
              </FileButton>
            </div>
            {files.length > 0 && (
              <div className="flex flex-col gap-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                  >
                    <p className="text-sm truncate">{file.name}</p>
                    <Button variant="subtle" color="red" compact onClick={() => removeFile(index)}>
                      Удалить
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="mt-3" loading={loading} disabled={isSubmitting}>
            Отправить заявку
          </Button>
        </form>
      </div>
    </MantineProvider>
  )
}
