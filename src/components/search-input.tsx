'use client';

import { Input } from '@heroui/input';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {
    const searchParams = useSearchParams();
    const term = searchParams.get('term');

    return (
        <form action={actions.search}>
            <Input name="term" defaultValue={term || ''} />
        </form>
    );
}
