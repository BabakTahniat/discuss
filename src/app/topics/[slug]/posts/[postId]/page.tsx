import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import PostShow from '@/components/posts/post-show';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import paths from '@/paths';
import { Skeleton } from '@heroui/skeleton';
import Link from 'next/link';
import { Suspense } from 'react';

type PostShowPageProps = {
    params: {
        slug: string;
        postId: string;
    };
};

export default async function PostShowPage({ params }: PostShowPageProps) {
    const { slug, postId } = await params;
    function LoadingSkeleton() {
        return (
            <div className="m-4" role="status">
                <div className="my-2">
                    <Skeleton className="h-8 w-96" />
                </div>
                <div className="p-4 border rounded space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-48" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <Link
                href={paths.topicShow(slug)}
                className="underline underline-offset-4 decoration-solid hover:text-blue-500 hover:-translate-y-4 transition"
            >
                {'<'} Back to {slug}
            </Link>
            <Suspense fallback={<LoadingSkeleton />}>
                <PostShow postId={postId} />
            </Suspense>
            <CommentCreateForm postId={postId} startOpen />
            <CommentList postId={postId} />
        </div>
    );
}
