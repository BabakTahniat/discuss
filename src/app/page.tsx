import { Button } from '@heroui/button';
import * as actions from '@/actions';
import { auth } from '@/auth';
import Profile from '@/components/profile';

export default async function Home() {
    const session = await auth();
    return (
        <div>
            <Profile />

            <form action={actions.signIn}>
                <Button type="submit">Sign in</Button>
            </form>
            {session?.user ? (
                <div>
                    user {JSON.stringify(session.user, null, 2)} logged in
                </div>
            ) : (
                <div>User logged out</div>
            )}
            <form action={actions.signOut}>
                <Button type="submit">Sign out</Button>
            </form>
        </div>
    );
}
