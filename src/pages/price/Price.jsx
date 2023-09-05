import { PriceList } from 'modules/PriceList'
import { CourseUsefulFor } from 'pages/courses/ui/CourseUsefulFor'

export const Price = () => {
  return (
    <div>
      <CourseUsefulFor />
      <PriceList />
      <div className='mt-10 lg:mt-20'>
        <CourseUsefulFor type='new' />
        <PriceList type='new' />
      </div>
    </div>
  )
}
