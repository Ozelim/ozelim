import React from 'react'
import { pb } from 'shared/api'
import { Product } from '../product'
import { useProductsStore } from './producsStore'
import { Breadcrumbs, Button, LoadingOverlay, Menu, Pagination } from '@mantine/core'
import { Sidebar } from '../sidebar/sidebar'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

export const Catalog = () => {

  const {products, clearSearched, searched, productsLoading, getAllProducts, getProductsByCategory, getProductsBySubCategory} = useProductsStore()

  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (searched) return
    getAllProducts()
  }, [])

  console.log('catalog,');
  

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
    <div className='container-market market px-4 mb-4 relative !mt-8'>
      <LoadingOverlay visible={productsLoading}/>
      <div className='grid grid-cols-[10%_auto] gap-4'>
        <div>
          <p className='py-2 bg-primary-500 text-white px-3 rounded-lg'>Категории</p>
          <Sidebar/>  
        </div>
        <div>
          <div className='flex justify-between gap-4'>
            <Breadcrumbs separator="→">
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
                <Button variant='outline'>Сортировать по</Button>
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
          <div className='grid grid-cols-5 gap-4 mt-4'>
            {products?.items?.map((q, i) => {
              return (
                <div className="mx-auto" key={i}>
                  <Product product={q} />
                </div>
              )
            })}
          </div>
          <div className='flex justify-center mt-4'>
            <Pagination
              total={products?.totalPages}
              value={products?.page}
            />
          </div>
        </div>
      </div>

    </div>
  )
}
