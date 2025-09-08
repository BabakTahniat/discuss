import PostList from '@/components/posts/post-list';
import { fetchPostsBySearchTerm } from '@/db/queries/posts';
import { redirect } from 'next/navigation';

type SearchPageProps = {
    searchParams: Promise<{ term: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { term } = await searchParams;

    if (!term) redirect('/');

    return <PostList fetchData={() => fetchPostsBySearchTerm(term)} />;
}
