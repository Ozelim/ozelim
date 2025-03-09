import React from 'react'
import { Product } from '../product'
import { useProductsStore } from './producsStore'
import { Breadcrumbs, Button, LoadingOverlay, Menu, Pagination } from '@mantine/core'
import { Sidebar } from '../sidebar/sidebar'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const Catalog = () => {

  const {products, clearSearched, searched, productsLoading, getAllProducts} = useProductsStore()

  const [params] = useSearchParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (searched) return
    getAllProducts()
  }, [])

  const temp = [
    {title: 'Главная', link: '/duken'},
    {title: 'Каталог', link: '/duken/catalog'},
    {title: params.get('cat')},
    {title: params.get('sub')},
  ]

  function handleCrumbClick (link) {
    if (!link) return
    navigate(link)
    clearSearched()
  }

  return (
    <>
      <LoadingOverlay visible={productsLoading}/>
      <div className='container-market market px-4 mb-4 relative !mt-8'>
        <div className='grid grid-cols-1 md:grid-cols-[15%_auto] gap-4'>
          <div className='block'>
            <p className='py-2 bg-primary-500 text-white px-3 rounded-lg'>Категории</p>
            <Sidebar/>  
          </div>
          <div>
            <div className='flex flex-col md:flex-row justify-between gap-4'>
              <Breadcrumbs separator="→" className='overflow-x-auto'>
                {temp.map((q, i) => {
                  if (q?.title) {
                    return (
                      <Button variant='white' compact key={i} onClick={() => handleCrumbClick(q?.link)}>{q.title}</Button>
                    )
                  }
                })}
              </Breadcrumbs>
              <Menu>
                <Menu.Target>
                  <Button variant='outline' size='sm' className='w-full md:w-auto'>Сортировать по</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item>По умолчанию</Menu.Item>
                  <Menu.Item>По категории</Menu.Item>
                  <Menu.Item>По подкатегории</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            {searched && (
              <p className='text-gray-500 text-sm mt-2'>Поиск по запросу: {searched}</p>
            )}
            <div className='grid grid-cols-1 sm:grid-cols-2 min-[1024px]:grid-cols-3 min-[1350px]:grid-cols-4 min-[1640px]:grid-cols-5 gap-4 mt-4'>
              {products?.items?.map((q, i) => {
                return (
                  <div className="mx-auto w-full" key={i}>
                    <Product product={q} />
                  </div>
                )
              })}
            </div>
            <div className='flex justify-center mt-4 overflow-x-auto'>
              <Pagination
                total={products?.totalPages}
                value={products?.page}
                size="sm"
              />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
