import Link from 'next/link';
import HeaderAuth from '@/components/header-auth';
import { Input } from '@heroui/input';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/navbar';

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
                        <Input />
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <HeaderAuth />
                </NavbarContent>
            </Navbar>
        </div>
    );
}
