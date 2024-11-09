'use client'
import { ModeToggle } from './ModeToggle';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { Home, LayoutDashboard } from 'lucide-react';
import { usePathname } from 'next/navigation';

function Navbar() {
  const { data: session } = useSession();
  const user : User = session?.user;
  const pathname = usePathname();

  return (
    <nav className="  px-4  mx-auto w-[80%] md:px-8 md:py-3 shadow-2xl bg-background border border-border rounded-full ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-3xl text-primary font-bold mb-4 md:mb-0">
          Stealthify
        </Link>
        <div className='flex gap-5'>
            {session ? (
            <>
                <span className="mr-4 flex items-center">
                Welcome, {user.username || user.email}
                </span>
                {
                pathname !== '/dashboard' ? (
                    <Button className="w-full md:w-auto bg-primary text-primary-foreground" >
                        <Link href="/dashboard">
                            <LayoutDashboard className="h-4 w-4" />
                        </Link>
                    </Button>
                ) : (
                    <Button>
                        <Link href="/">
                            <Home className="h-6 w-6" />
                        </Link>
                    </Button>
                )
                }
                <Button onClick={() => signOut()} className="w-full md:w-auto bg-primary text-primary-foreground" variant='outline'>
                Logout
                </Button>
            </>
            ) : (
            <Link href="/sign-in">
                <Button  variant={'outline'}>Login</Button>
            </Link>
            )}
            <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;