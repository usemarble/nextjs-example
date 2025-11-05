import React from 'react';
import Container from './container';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='border-b border-dashed'>
      <Container>
        <nav className='w-full flex items-center justify-center py-4 lg:py-8'>
          <Link href='/' aria-label='Homepage' className='text-2xl font-serif'>
            <p>Postcards on canvas</p>
          </Link>
        </nav>
      </Container>
    </header>
  );
}
