import React, { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { ChevronDownIcon, ChevronUpIcon, FilterIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid'

import { useRouter } from 'next/router'
import { useDebounce } from 'use-debounce'
import axiosRoot from '@seventech/utils/axios-root'
import { Loading, NextPage } from '@seventech/shared'
import { RangeSlider } from './RangeSlider'
import { ProductCards } from '../products'
// import { categorya, productt } from 'src/mock/mock-data'

const sortOptions = [
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

const brands = [
  'ReDragon', 'Asus', 'Dell', 'HP', 'Gigabyte', 'LG', 'Samsung', 'Pixel', 'Oppo'
]

export function Category({ term }) {

  const router = useRouter()
  let slug = router.query.id

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
  const [searchedNamed] = useDebounce(term, 400);
  const [maxPrice] = useDebounce(maxValue, 400);
  const [minPrice] = useDebounce(minValue, 400);

  React.useEffect(() => {
    function slugify() {
      setTimeout(() => { setName(slug) }, 500)
    }
    slugify()
  }, [slug]);

  //get Data
  React.useEffect(() => {
    async function getCategory() {
      try {
        const res = await axiosRoot.get('/categories');
        setCategories(res.data.categories)
      } catch (err) {
        console.log(err)
      }
    }
    getCategory()
  }, [slug, term]);

  // getProduct
  React.useEffect(() => {
    async function getProducts() {
      try {
        const res = await axiosRoot.get(`/products?page=${page + 1}&size=${pageSize}&category=${cats}&subCategory=${searchSubCats}&lowerPrice=${minPrice}&higherPrice=${maxPrice}&highFirst=${priceHL}&searchQuery=${searchedNamed || searchedName}`);
        setItems(res.data.products)
        setTotal(res.data.count)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, [searchSubCats, maxPrice, priceHL, minPrice, cats, searchedName, searchedNamed, page, pageSize])


  function handleCategoryFilter(nam) {
    setSearchSubCats('')
    setName('')
    setCats(nam)
    setMaxValue(50000)
    // setMobileFiltersOpen(false)
  }

  function hadlePrice(bol) {
    setName('')
    priceHL !== bol &&
      setPriceHL(bol)
  }

  function handleFilterOpen() {
    setMobileFiltersOpen(true)
  }

  function handleTo(link) {
    router.push(`/category/${link}`)
    setMobileFiltersOpen(false)
    // setTimeout(() => { setMobileFiltersOpen(false) }, 500)
  }

  const sortedCategories = categories.slice().sort((a, b) => a.name.localeCompare(b.name));

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
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-black shadow-xl">
                <div className="flex items-center py-4 justify-between px-4">
                  <h2 className="text-lg font-semibold text-red-600">Categories</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-red-600"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Category List */}
                <div className="border-t-2 border-red-600">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="px-4 text-md grid gap-2 py-3 font-semibold text-red-600">
                    {sortedCategories.map((category, index) => (
                      <li key={category.name}>
                        <button type='button' onClick={() => handleTo(category.name)}>
                          {`${index + 1}. `}{category.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className='border-t-2 p-4 border-red-600'>
                    <div className='w-full bg-opacity-10 px-4 bg-red-600 rounded-lg '>
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
                  </div>
                  <div className='hidden'>
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
                  </div>

                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* PC view */}
      <main className="mx-auto">
        <div className='bg-gradient-to-r from-blue-500 via-pink-600 to-green-500'>
          <div className="flex items-baseline px-4 sm:px-6 lg:px-8 justify-between py-6">
            {/* Upper Top section */}
            <h1 className="text-xl md:text-2xl font-normal tracking-tight text-gray-200">Categories</h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-gray-300">
                    Sort by
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-200 group-hover:text-gray-300"
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

              {/* <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-300 sm:ml-7">
              <span className="sr-only">View grid</span>
              <ViewGridIcon className="h-5 w-5" aria-hidden="true" />
            </button> */}
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-300 sm:ml-6 lg:hidden"
                onClick={() => handleFilterOpen()}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <section className="py-6 px-4 sm:px-6 lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Categories
          </h2>
          {/* SideBar */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <h3 className="sr-only">Categories</h3>

              {/* All Categories */}
              <ul role="list" className="space-y-4 border-b border-gray-600 pb-6 text-md font-medium">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex hover:text-gray-500 focus:text-gray-400 w-full justify-between text-left text-md font-medium text-black focus:outline-none focus:ring-0">
                            <button onClick={() => handleCategoryFilter(category.name)} type='button'>
                              {category.name}
                            </button>
                            <ChevronUpIcon
                              className={`${!open ? 'rotate-180 transform' : 'text-gray-700'} h-5 w-5 text-black`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="p-2 gap-2 grid text-md text-gray-700">
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

              {/* Filter Brands  */}
              <ul role="list" className="space-y-4 border-b py-4 border-gray-600 text-md font-medium">

                <li>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex py-2 hover:text-gray-500 focus:text-gray-400 w-full justify-between text-left text-md font-medium text-black focus:outline-none focus:ring-0">
                          <button type='button'>
                            Brands
                          </button>
                          <ChevronUpIcon
                            className={`${!open ? 'rotate-180 transform' : 'text-gray-700'} h-5 w-5 text-black`}
                          />
                        </Disclosure.Button>
                        <div className='grid gap-1'>
                          {brands?.map((brand, index) => (
                            <Disclosure.Panel key={index} className="flex hover:text-gray-500 focus:text-gray-400 w-full justify-between text-left text-md font-medium text-black focus:outline-none focus:ring-0">
                              <button onClick={() => router.push(`/category/${brand}`)} type='button'>
                                {brand}
                              </button>
                            </Disclosure.Panel>
                          ))}
                        </div>
                      </>
                    )}
                  </Disclosure>
                </li>

              </ul>
              {/* Price Range */}
              <div className='lg:col-span-3 xl:col-span-2'>
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

              {/* Filters SideBar */}
              <div className='hidden'>
                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-red-600 rounded-sm p-3 text-sm text-gray-200 hover:text-gray-300">
                            <span className="font-medium text-gray-100">{section.name}</span>
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

            </div>

            {/* Null Product Loading */}
            {items.length === 0 ? (
              <div className='w-full lg:col-span-9 xl:col-span-10'>
                <Loading bg='black' />
              </div>
            ) : null}

            {/* Product List */}
            <div className="lg:col-span-9 xl:col-span-10">
              <div className='items-center justify-start mx-auto gap-2 md:gap-4 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4'>

                {items?.map((product, index) => {
                  return (
                    <ProductCards key={index} product={product} />
                  )
                })}
              </div>
              <NextPage total={total} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

// This App is made by Ahnaf and Tanvir 