import React from 'react'
import { Product } from '../product'
import { useProductsStore } from './producsStore'
import {
  Breadcrumbs,
  Button,
  Loader,
  LoadingOverlay,
  Menu,
  Pagination,
  ActionIcon,
  Rating,
} from '@mantine/core'
import { Sidebar } from '../sidebar/sidebar'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getImageUrl, formatNumber } from 'shared/lib'
import clsx from 'clsx'
import { FaRegHeart } from 'react-icons/fa'
import { useAuth } from 'shared/hooks'
import { FiShoppingCart } from 'react-icons/fi'
import { CiGrid41, CiGrid2H } from 'react-icons/ci'
import { ProductRow } from '../product-row'

export const Catalog = () => {
  const { user } = useAuth()

  const { products, clearSearched, searched, productsLoading, getAllProducts } = useProductsStore()

  const [template, setTemplate] = React.useState('row')

  function handleTemplateChange(template) {
    setTemplate(template)
  }

  const [params] = useSearchParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (searched) return
    getAllProducts()
  }, [])

  const temp = [
    { title: 'Главная', link: '/duken' },
    { title: 'Каталог', link: '/duken/catalog' },
    { title: params.get('cat') },
    { title: params.get('sub') },
  ]

  function handleCrumbClick(link) {
    if (!link) return
    navigate(link)
    clearSearched()
  }

  async function addToFavorites() {

  }

  return (
    <>
      <div className="max-w-[1140px] w-full mx-auto market px-4 mb-4 relative !mt-8">
        <div className="grid grid-cols-1 md:grid-cols-[20%_auto] gap-4">
          <div className="block">
            <p className="py-2 bg-primary-500 text-white px-3 rounded-lg">Категории</p>
            <Sidebar />
          </div>
          <div className="w-full h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
              <Breadcrumbs separator="→" className="overflow-x-auto">
                {temp.map((q, i) => {
                  if (q?.title) {
                    return (
                      <Button
                        variant="white"
                        compact
                        key={i}
                        onClick={() => handleCrumbClick(q?.link)}
                      >
                        {q.title}
                      </Button>
                    )
                  }
                })}
              </Breadcrumbs>

              <div className="flex gap-4">
                <div className="flex gap-2">
                  <ActionIcon
                    variant="outline"
                    size="md"
                    onClick={() => handleTemplateChange('row')}
                    className={clsx({ '!bg-primary-500': template === 'row' })}
                  >
                    <CiGrid2H size={20} color={template === 'row' ? 'white' : 'black'} />
                  </ActionIcon>

                  <ActionIcon
                    variant="outline"
                    size="md"
                    onClick={() => handleTemplateChange('grid')}
                    className={clsx({ '!bg-primary-500': template === 'grid' })}
                  >
                    <CiGrid41 size={20} color={template === 'grid' ? 'white' : 'black'} />
                  </ActionIcon>
                </div>

                <Menu>
                  <Menu.Target>
                    <Button variant="outline" size="xs" className="w-full md:w-auto">
                      Сортировать
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item>По популярности</Menu.Item>
                    <Menu.Item>По возрастанию цены</Menu.Item>
                    <Menu.Item>По убыванию цены</Menu.Item>
                    <Menu.Item>По рейтингу</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
            {searched && <p className="text-gray-500 text-sm mt-2">Поиск по запросу: {searched}</p>}
            {productsLoading && (
              <div className="flex justify-center items-center h-full">
                <Loader />
              </div>
            )}

            {products?.items?.length === 0 && (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-sm">Товары не найдены</p>
              </div>
            )}

            <div className='flex flex-col gap-4'>
              {template === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 min-[1024px]:grid-cols-3 gap-4 mt-4">
                  {products?.items?.map((q, i) => {
                    return <Product product={q} key={i} />
                  })}
                </div>
              )}

              {template === 'row' && (
                <div className="space-y-8 mt-4">
                  {products?.items?.map((q, i) => {
                    return <ProductRow product={q} key={i} />
                  })}
                </div>
              )}

              <div className="flex justify-center overflow-x-auto mt-auto">
                <Pagination total={products?.totalPages} value={products?.page} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
