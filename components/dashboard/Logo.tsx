import Link from 'next/link';
import React from 'react'
import { buttonVariants } from '../ui/button';
import { StarHalfIcon } from 'lucide-react';

const Logo = () => {
  return (
    <Link href={"/dashboard"}
    className={buttonVariants({
      className:
      "hidden md:flex navLink !mt-0 !mb-4 lg:hover:bg-transparent",
      variant:"ghost",
      size:"lg",
    })}
    >
      <StarHalfIcon className='h-6 w-6 shrink-0 lg:hidden bg-white text-black p-.5 rounded-md hover:bg-orange-600'/>
      <p className={`font-semibold text-xl hidden lg:block`}> 
        EEB
      </p>
    </Link>
  )
}

export default Logo