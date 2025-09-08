import Link from 'next/link';
import HeaderAuth from '@/components/header-auth';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';
import SearchInput from './search-input';
import { Suspense } from 'react';

export default function Header() {
    return (
        <div>
            <Navbar className="shadow mb-6">
                <NavbarBrand>
                    <Link href="/" className="font-bold">
                        Discuss
                    </Link>
                </NavbarBrand>
                <NavbarContent justify="center">
                    <NavbarItem>
                        <Suspense>
                            <SearchInput />
                        </Suspense>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <HeaderAuth />
                </NavbarContent>
            </Navbar>
        </div>
    );
}
