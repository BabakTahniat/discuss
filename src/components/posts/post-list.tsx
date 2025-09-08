// import type { Post, User, Topic } from '@/generated/prisma';
import Link from 'next/link';
import paths from '@/paths';
import { PostsWithData } from '@/db/queries/posts';

type PostListProps = {
    fetchData: () => Promise<PostsWithData[]>;
};

export default async function PostList({ fetchData }: PostListProps) {
    const posts = await fetchData();

    if (posts.length === 0)
        return (
            <div className="space-y-2 h-16 border rounded flex items-center p-2 ">
                No post found
            </div>
        );

    const renderedPosts = posts.map((post) => {
        const topicSlug = post.topic.slug;

        if (!topicSlug) {
            throw new Error('Need a slug to link to a post');
        }

        return (
            <div key={post.id} className="border rounded p-2">
                <Link href={paths.postShow(topicSlug, post.id)}>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <div className="flex flex-row gap-8">
                        <p className="text-xs text-gray-400">
                            By {post.user.name}
                        </p>
                        <p className="text-xs text-gray-400">
                            {post._count.comments} comments
                        </p>
                    </div>
                </Link>
            </div>
        );
    });

    return <div className="space-y-2">{renderedPosts}</div>;
}
