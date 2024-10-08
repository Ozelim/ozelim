import { Accordion, Button, Modal, Select, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useLangContext } from 'app/langContext'
import React from 'react'
import { pb } from 'shared/api'
import { usePageData } from 'shared/hooks'
import { Image } from 'shared/ui'

async function getRights () {
  return await pb.collection('rights_data').getFullList()
}

const acc = [
  {
    label: `Консультации и правовая поддержка`,
    description: 
    <>
      <p>Юридическая консультация является основополагающей частью правовой поддержки, которую Ассоциация предлагает своим членам. Она может охватывать такие темы, как регулирование туристической деятельности, правовое сопровождение сделок и защита интересов членов Ассоциации в отношениях с государственными органами и партнерами.</p>
      <p className='my-4'>Особое внимание уделяется:</p>
      <ul className='list-disc px-6'>
        <li>Разъяснению норм законодательства в сфере туризма;</li>
        <li>Предоставлению рекомендаций по правовому оформлению сделок и заключению договоров;</li>
        <li>Помощи в решении правовых вопросов, возникающих в процессе ведения туристического бизнеса.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>Консультации позволяют членам Ассоциации получать актуальную информацию и правовые советы, что минимизирует риски и помогает строить успешную правовую стратегию.</p>
    </>
  },
  {
    label: `Представление интересов в судах`,
    description: 
    <>
      <p>Ассоциация обеспечивает защиту своих членов в судебных спорах, связанных с туристической деятельностью, а также другими аспектами их бизнеса. Юридическое представительство охватывает:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Оспаривание решений государственных органов, таких как отказ в выдаче лицензий, штрафы и другие административные меры;</li>
        <li>Разрешение гражданско-правовых споров, связанных с выполнением договоров, качеством туристических услуг, а также вопросами компенсации и ответственности;</li>
        <li>Защиту прав и интересов членов Ассоциации в арбитражных и третейских судах, а также на стадии апелляции и кассации.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>Профессиональное представление в суде обеспечивает членам Ассоциации правовую защиту на всех стадиях судебного разбирательства, что повышает их шансы на благоприятный исход.</p>
    </>
  },
  {
    label: `Сопровождение сделок`,
    description: 
    <>
      <p>Члены Ассоциации могут рассчитывать на полное юридическое сопровождение сделок, касающихся туристической деятельности. Это включает:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Проверку и анализ договоров на предмет соответствия законодательству и интересам клиента;</li>
        <li>Подготовку и составление договоров на поставку услуг, аренду, покупку недвижимости или туристического оборудования;</li>
        <li>Участие в переговорах с контрагентами с целью защиты интересов членов Ассоциации.</li>
      </ul>
      <p className='mt-4'>
        Такой подход минимизирует риски, связанные с заключением и выполнением договоров, а также помогает избежать споров в будущем.
      </p>
    </>
  },
  {
    label: `Лицензирование деятельности`,
    description: 
    <>
      <p>Получение лицензии является важным элементом для ведения туристического бизнеса, и Ассоциация предлагает услуги по полному сопровождению процесса лицензирования:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Консультации по необходимым документам и требованиям для получения лицензии;</li>
        <li>Подготовка и подача пакета документов в государственные органы;</li>
        <li>Сопровождение процесса получения разрешительных документов на всех этапах.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>
        Правильное оформление лицензий и разрешений позволяет членам Ассоциации легально вести деятельность, избегая проблем с государственными органами и возможных штрафов.
      </p>
    </>
  },
  {
    label: `Юридическая экспертиза договоров`,
    description: 
    <>
      <p>Качественное составление и проверка договоров — это залог успешного сотрудничества и минимизации юридических рисков. Ассоциация предлагает своим членам услуги по юридической экспертизе договоров:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Анализ и корректировка существующих договоров, чтобы исключить возможность нарушения прав членов Ассоциации;</li>
        <li>Разработка шаблонных договоров для упрощения работы с клиентами и партнерами;</li>
        <li>Подготовка специализированных договоров с учетом индивидуальных особенностей и потребностей бизнеса.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>
        Юридическая экспертиза договоров защищает интересы членов Ассоциации, помогая избежать конфликтных ситуаций и разногласий с партнерами и клиентами.
      </p>
    </>
  },
  {
    label: `Международное правовое сопровождение`,
    description: 
    <>
      <p>Члены Ассоциации могут получать юридическую помощь по вопросам международного сотрудничества и трансграничных сделок. В сфере туризма часто возникает необходимость взаимодействия с иностранными партнерами, и Ассоциация помогает в этом процессе:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Подготовка и сопровождение международных контрактов;</li>
        <li>Консультации по вопросам правового регулирования трансграничной деятельности;</li>
        <li>Сопровождение международных сделок и договоров с иностранными туристическими компаниями.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>Международное правовое сопровождение позволяет членам Ассоциации расширить свою деятельность на международный рынок, минимизируя юридические риски и сложности, связанные с трансграничными операциями.</p>
    </>
  },
  {
    label: `Консультации по трудовым вопросам`,
    description: 
    <>
      <p>Юридическая помощь в сфере трудовых отношений также важна для членов Ассоциации, особенно в случае конфликтов с сотрудниками или необходимости составления трудовых договоров:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Подготовка трудовых договоров и коллективных соглашений;</li>
        <li>Консультирование по вопросам увольнения, дисциплинарных взысканий и других аспектов трудового законодательства;</li>
        <li>Представление интересов членов Ассоциации в трудовых спорах.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>Грамотное управление трудовыми вопросами помогает членам Ассоциации избежать конфликтов с сотрудниками и соответствовать требованиям трудового законодательства.</p>
    </>
  },
  {
    label: `Юридическая поддержка проектов развития`,
    description: 
    <>
      <p>Ассоциация активно поддерживает своих членов в реализации проектов, направленных на развитие туристической инфраструктуры и повышение качества предоставляемых услуг. В рамках этой услуги предлагается:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Юридическое сопровождение инвестиционных проектов, связанных с развитием туристических объектов;</li>
        <li>Консультации по правовым вопросам, связанным с участием в государственных программах поддержки туризма;</li>
        <li>Помощь в разработке правовых стратегий для реализации проектов по улучшению туристических услуг.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>Юридическая поддержка проектов позволяет членам Ассоциации эффективно развивать свои бизнесы, получая правовую защиту и советы на каждом этапе реализации.</p>
    </>
  },
  {
    label: `Регистрация и сопровождение эндаумент-фонд`,
    description: 
    <>
      <p>Эндаумент-фонд играют важную роль в поддержке долгосрочных проектов, и Ассоциация предлагает помощь в их создании и управлении. Услуги включают:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Регистрация эндаумент-фонд для финансирования туристических инициатив;</li>
        <li>Сопровождение деятельности фонд и обеспечение их соответствия законодательству;</li>
        <li>Привлечение доноров и управление активами фонд.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>Эндаумент-фонд позволяют членам Ассоциации финансировать долгосрочные проекты и обеспечивать устойчивое развитие туристической отрасли.</p>
    </>
  },
  {
    label: `Защита прав потребителей`,
    description: 
    <>
      <p>Ассоциация также предлагает юридические услуги по защите прав потребителей в туристической отрасли. Это включает:</p>
      <ul className='list-disc px-6 mt-4'>
        <li>Консультирование по вопросам прав туристов;</li>
        <li>Представление интересов членов Ассоциации в случаях жалоб и претензий со стороны клиентов;</li>
        <li>Сопровождение дел в суде, связанных с нарушением прав потребителей.</li>
      </ul>
      <p className='font-bold mt-4'>Преимущества:</p>
      <p>Защита прав потребителей помогает членам Ассоциации соблюдать законодательство и поддерживать высокий уровень доверия со стороны клиентов.</p>
    </>
  },
]

export const Rights = () => {

  const {headings, text, images} = usePageData('rights')

  const [types, setTypes] = React.useState([])

  const [type, setType] = React.useState('')

  const [opened1, handlers1] = useDisclosure()

  const {kz} = useLangContext()

  React.useEffect(() => {
    getRights()
    .then(res => {
      setTypes(res?.[0]?.types)
    })
  }, [])

  const [data, setData] = React.useState({
    name: '',
    phone: '',
  })

  async function send () {
    await pb.collection('rights_bids').create({
      ...data, 
      type: type,
    })
    .then(res => {
      setData({
        name: '',
        phone: '',
      })
      setType('')
      showNotification({
        title: 'Заявка',
        color: 'green',
        message: 'Заявка успешно отправлена'
      })
    })
  }

  return (
    <>
      <div className='w-full'>
        <div className="container">

          <div className="grid lg:grid-cols-2 mt-6 gap-10">
            <div>
              <Image
                record={images}
                index={1}
                className="w-full max-w-[300px] mx-auto max-h-[300px] rounded-primary object-cover object-center"
              />
              <h2 className="text-center pt-2 font-head text-2xl px-6 text-primary-500">
                {headings?.heading1}
              </h2>
              <p className="px-4 text-center text">
                {text?.text1}
              </p>
              <div className='text-center'>
                <a href={headings?.link} target="_blank" className="underline text-blue-300">
                  Перейти по ссылке
                </a>
              </div>
              {/* <p className='mt-2 text-lg text-center'>{headings?.name}</p> */}
            </div>
            <div>
              <h1 className="text-2xl lg:text-4xl font-semibold font-head text-teal-500">
                {headings?.heading2}
              </h1>
              <p className="text mt-5">
                {text?.text2}
              </p>
              {/* <ul className="space-y-4 mt-8">
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                    {text?.text3}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, enim!
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text">
                    {text?.text4}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, enim!
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                <p className="text">
                    {text?.text5}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, enim!
                  </p>
                </li>
              </ul> */}
            </div>
          </div>

          <section className="w-full mt-4">
            <h1 className="text-4xl text-primary-500 font-bold">
              {headings?.heading3}
            </h1>
            <div className='flex flex-col md:flex-row gap-8 mt-6'>
              <Image
                className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                record={images}
                index={2}
              />
              <div>
                <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                  {text?.text3}
                  {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, veniam. */}
                </ul>
              </div>
            </div>
          </section>




          <div className='grid gap-8 mt-5 max-w-3xl mx-auto'>
            <p className="text-left">{text?.text4} </p>
          </div>

          <div>
            <h2 className='font-semibold text-[20px] mt-5 text-primary-500'>
              {headings?.heading4}
              {/* Lorem, ipsum dolor. */}
            </h2>
            <ul className="space-y-4 px-4 mt-5">
              <li className="space-x-4">
                <div className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    {text?.text5}
                  </p>
                </div>
                <p className="text-left mt-3 text">{text?.text55} </p>
              </li>
              <li className="space-x-4">
                <div className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    {text?.text6}
                  </p>
                </div>
                <p className="text-left mt-3 text">{text?.text66} </p>
              </li>
              <li className="space-x-4">
                <div className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    {text?.text7}
                  </p>
                </div>
                <p className="text-left mt-3 text">{text?.text77} </p>
              </li>
              <li className="space-x-4">
                <div className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    {text?.text8}
                  </p>
                </div>
                <p className="text-left mt-3 text">{text?.text88} </p>
              </li>
              <li className="space-x-4">
                <div className='flex gap-4'>
                  <div className="bg-primary-500 w-4 h-4 rounded-full mt-1 flex-shrink-0" />
                  <p className="text-lg">
                    {text?.text9}
                  </p>
                </div>
                <p className="text-left mt-3 text">{text?.text99} </p>
              </li>
            </ul>
          </div>

          <section className='mt-10'>
            <h1 className='font-bold text-4xl text-primary-500 text-center'>Юридические услуги для членов Ассоциации «ÖZ ELİM»</h1>
            {/* <p className='mt-4 max-w-4xl text-center mx-auto'>Члены Ассоциации «ÖZ ELİM» получают доступ к широкому спектру юридических услуг, которые направлены на защиту их прав, поддержку туристических проектов, а также содействие развитию туристической отрасли в Казахстане. Рассмотрим эти услуги более подробно:</p> */}
            <Accordion
              variant='separated'
              className='my-10'
              defaultValue='0'
            >
              {acc.map((q, i) => {
                return (
                  <Accordion.Item value={`${i}`}>
                    <Accordion.Control className='!text-xl !font-bold '>{i + 1}. 
                      <span className='text-primary-500'>{q?.label}</span>
                    </Accordion.Control>
                    <Accordion.Panel className='p-4'>
                      {q?.description}
                    </Accordion.Panel>
                  </Accordion.Item>
                )
              })}
            </Accordion>
          </section>

          <section className="w-full mt-4">
            <h1 className="text-4xl text-primary-500 font-bold">
            {headings?.heading5}
            </h1>
            <div className='flex flex-col md:flex-row gap-8 mt-6'>
              <Image
                className="max-w-2xl w-full rounded-primary max-h-80 object-cover"
                record={images}
                index={3}
              />
              <div>
                <ul className="mt-3 text-lg font-medium text-[#5a5959] space-y-3">
                  {text?.text10}
                </ul>
              </div>
            </div>
          </section>

          <div className='flex justify-center mt-4'>
            <Button
              onClick={() => handlers1.open()}
            >
              {kz ? 'Өтініш қалдыру' : `Оставить заявку`}
            </Button>
          </div>



        </div>
      </div>
      <Modal
        opened={opened1}
        onClose={() => handlers1.close()}
        centered
        title='Оставить заявку'
      >
        <section className='max-w-md mx-auto border px-4 pb-4 shadow-lg bg-white'>
          <TextInput
            label='Имя'
            placeholder='Ваше имя'
            className='mt-3'
            variant='filled'
            value={data?.name}
            onChange={e => setData({...data, name: e?.currentTarget?.value})}
          />
          <TextInput
            label='Контактный номер'
            placeholder='Ваш номер'
            className='mt-3'
            variant='filled'
            value={data?.phone}
            onChange={e => setData({...data, phone: e?.currentTarget?.value})}
          />
          <Select
            label='Вид услуги'
            placeholder='Выберите вид услуги'
            data={types ?? []}
            className='mt-3'
            variant='filled'
            onChange={e => setType(e)}
          />
          <div className='flex justify-center mt-6'>
            <Button 
              disabled={!data?.name || !data?.phone || !type}
              onClick={send}
            >
              Оставить заявку
            </Button>
          </div>
        </section>
      </Modal>
    </>
  )
}