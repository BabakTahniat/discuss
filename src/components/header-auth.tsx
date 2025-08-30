'use client';
import * as actions from '@/actions';
import { useSession } from 'next-auth/react';

import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import { NavbarItem } from '@heroui/navbar';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Spinner } from '@heroui/react';

export default function HeaderAuth() {
    const session = useSession();

    let authContent: React.ReactNode;
    if (session.status === 'loading') {
        authContent = <Spinner color="default" />;
    } else if (session?.data?.user) {
        authContent = (
            <NavbarItem>
                <Popover placement="left">
                    <PopoverTrigger>
                        <Avatar src={session.data.user.image || ''} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="p-4">
                            <form action={actions.signOut}>
                                <Button type="submit" color="primary">
                                    Sign Out
                                </Button>
                            </form>
                        </div>
                    </PopoverContent>
                </Popover>
            </NavbarItem>
        );
    } else {
        authContent = (
            <>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="bordered"
                        >
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button type="submit" color="primary" variant="flat">
                            Sign Up
                        </Button>
                    </form>
                </NavbarItem>
            </>
        );
    }

    return authContent;
}
