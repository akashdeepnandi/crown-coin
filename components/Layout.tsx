import Link from 'next/link'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col justify-center min-h-screen'>
      <nav className='flex items-center flex-wrap bg-blue-500 p-6'>
        <div className='flex items-center text-white mr-auto'>
          <Link href='/' className='font-semibold text-xl tracking-tight'>
            Crowd Coin
          </Link>
        </div>
        <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-4'>
          <div className='text-sm lg:flex-grow'>
            <Link
              href='/'
              className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'
            >
              Campaigns
            </Link>
            <Link
              href='/new'
              className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white'
            >
              Add Campaign
            </Link>
          </div>
        </div>
      </nav>
      <main className='flex flex-col center pt-2 px-40 bg-gray-200 min-h-screen'>
        {children}
      </main>

      <footer className='mt-auto'>
        <div className='bg-blue-600 p-4 text-center text-white'>
          Crowd Coin 2023
        </div>
      </footer>
    </div>
  )
}

export default Layout
