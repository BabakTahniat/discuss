import type { Comment } from '@/generated/prisma';
import db from '@/db';

export type CommentWithAuthor = Comment & {
    user: {
        name: string | null;
        image: string | null;
    };
};
import { cache } from 'react';
// export const fn = cache(fn definition)

export const fetchCommentsByPostId = cache(
    (postId: string): Promise<CommentWithAuthor[]> => {
        return db.comment.findMany({
            where: { postId },
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        });
    },
);
