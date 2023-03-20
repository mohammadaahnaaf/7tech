import React, { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon } from '@heroicons/react/solid'

import { useRouter } from 'next/router'
// import { ProductCard } from '../Shop'
import Link from 'next/link'
import { useDebounce } from 'use-debounce'
import axiosRoot from '@seventech/utils/axios-root'
import { Loading, Pagenation } from '@seventech/shared'
import { RangeSlider } from './RangeSlider'
import { ProductCards } from '../products'

const sortOptions = [
  // { name: 'Most Popular', bol: null, current: true },
  // { name: 'Best Rating', bol: null, current: false },
  // { name: 'Newest', bol: null, current: false },
  { name: 'Price: High to Low', bol: true, current: false },
  { name: 'Price: Low to High', bol: false, current: false }
]
const filters = [
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: 'low', label: 'Low to High', checked: false },
      { value: 'high', label: 'High to Low', checked: false },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'black', label: 'Black', checked: true },
      { value: 'red', label: 'Red', checked: false },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'redragon', label: 'ReDragon', checked: true },
    ],
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Category({ term }) {

  const router = useRouter()
  const slug = router.query.id

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [cats, setCats] = useState('')
  const [searchSubCats, setSearchSubCats] = useState('')
  const [total, setTotal] = React.useState(0)
  const [pageSize, setPageSize] = React.useState(8)
  const [page, setPage] = React.useState(0)
  const [name, setName] = React.useState('')

  const [minValue, setMinValue] = useState(1);
  const [priceHL, setPriceHL] = useState(true);
  const [maxValue, setMaxValue] = useState(8000);

  const [searchedName] = useDebounce(name, 400);
  const [maxPrice] = useDebounce(maxValue, 400);
  const [minPrice] = useDebounce(minValue, 400);

  React.useEffect(() => {
    !slug ? setName(term) : setName(slug)
  }, [term, slug])

  //Get Data
  React.useEffect(() => {
    async function getCategory() {
      const res = await axiosRoot.get('/categories');
      setCategories(res.data.categories)
    }
    getCategory()
  }, [slug, term]);

  //getProduct
  React.useEffect(() => {
    async function getProducts() {
      const res = await axiosRoot.get(`/products?page=${page + 1}&size=${pageSize}&category=${cats}&subCategory=${searchSubCats}&lowerPrice=${minPrice}&higherPrice=${maxPrice}&highFirst=${priceHL}&searchQuery=${searchedName}`);
      setItems(res.data.products)
      setTotal(res.data.count)
    }
    getProducts()
  }, [searchSubCats, maxPrice, priceHL, minPrice, cats, searchedName, page, pageSize])


  function handleCategoryFilter(nam) {
    setSearchSubCats('')
    setName('')
    setCats(nam)
    setMaxValue(50000)
  }

  function hadlePrice(bol) {
    setName('')
    priceHL !== bol &&
      setPriceHL(bol)
  }

  return (
    <div>
      {/* Mobile view filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-red-600 py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-semibold text-gray-200">Categories</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-red-600 p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t-2 border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="px-4 text-md grid gap-2 py-3 font-semibold text-gray-100">
                    {categories.map((category, index) => (
                      <li key={category.name}>
                        <Link href={`/category/${category.name}`}>
                          <a>{`${index + 1}. `}{category.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-300">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-300"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* PC view filter dialog */}
      <main className="bg-black mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pt-6 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-red-600">Categories</h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-gray-300">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-40 mt-2 w-40 origin-top-right rounded-md bg-black ring-white shadow-2xl ring-1 ring-opacity-20 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (

                          <button
                            type='button'
                            onClick={() => hadlePrice(option.bol)}
                            className={classNames(
                              option.current ? 'font-medium text-gray-300' : 'text-gray-300',
                              active ? 'bg-red-500' : '',
                              'block px-4 py-2 text-sm w-full text-left'
                            )}
                          >
                            {option.name}
                          </button>

                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-300 sm:ml-7">
              <span className="sr-only">View grid</span>
              <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-300 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FilterIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="py-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid bg-black grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
            {/* Filters */}
            <div className="hidden lg:block lg:col-span-2">
              <h3 className="sr-only">Categories</h3>
              <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-md font-medium text-gray-300">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex hover:text-white focus:text-gray-100 w-full justify-between text-left text-md font-medium text-red-600 focus:outline-none focus:ring-0">
                            <button onClick={() => handleCategoryFilter(category.name)} type='button'>
                              {index + 1}. {category.name}
                            </button>
                            <ChevronUpIcon
                              className={`${!open ? 'rotate-180 transform' : 'text-white'} h-5 w-5 text-red-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="p-2 gap-2 grid text-md text-gray-100">
                            {category.subCategories?.map((sub, index) => (
                              <button className='flex w-full items-center hover:text-green-600' type='button' onClick={() => setSearchSubCats(sub.name)}>{index + 1}. {sub.name}</button>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </li>
                )
                )}
              </ul>

              {/* Price Range */}

              <div className='lg:col-span-2'>
                <RangeSlider
                  minValue={minValue}
                  setMinValue={setMinValue}
                  maxValue={maxValue}
                  setMaxValue={setMaxValue}
                  min={1}
                  max={10000}
                  step={1}
                  priceCap={1000}
                />
              </div>

              {filters.map((section) => (
                <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-red-600 rounded-sm p-3 text-sm text-gray-200 hover:text-gray-300">
                          <span className="font-medium text-gray-300">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-400"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>

            {/* Product grid */}
            {items.length === 0 ? (
              <Loading bg='black' />
            ) : null}
            <div className="lg:col-span-10">
              <div className='items-center justify-start mx-auto gap-2 md:gap-4 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>

                {items?.map((product, index) => {
                  return (
                    <ProductCards key={index} product={product} />
                  )
                })}
              </div>
              <div className='bg-red-600 rounded-lg bg-opacity-40 mt-4'>
                <Pagenation total={total} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
