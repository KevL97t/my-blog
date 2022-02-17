import React, { useState, useEffect  } from 'react'
import Link from 'next/link'
import { getCategories } from '../services'

const Header = () => {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    getCategories()
      .then((newCategories => setCategories(newCategories)))
  },[])

  return (
    <div className='container px-10 mb-8 bg-neutral-900 mx-auto lg:pt-4 bg:my-6 rounded-md opacity-95 mt-2 lg:mt-4 max-w-9/10'>
      <div className='w-full inline-block border-blue-400 py-8'>
        <div className='md:float-left block'>
          <Link href='/'>
            <span className='cursor-pointer font-bold text-4xl text-amber-400 border-b-2 pb-2 lg:pr-8 opacity-100'>
              Behold The Blog
            </span>
          </Link>
        </div>
        <div className='hidden md:float-left md:contents'>
          {categories.map(category => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transtion duration-500 hover:text-amber-500'>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header