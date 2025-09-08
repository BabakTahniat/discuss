'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import paths from '@/paths';
import db from '@/db';

const createCommentSchema = z.object({
    content: z.string().min(3),
});

type CreateCommentFormState = {
    content?: { errors: string[] } | undefined;
    _form?: string[];
    success?: boolean;
};

export async function createComment(
    { postId, parentId }: { postId: string; parentId?: string },
    formState: CreateCommentFormState,
    formData: FormData,
): Promise<CreateCommentFormState> {
    const data = Object.fromEntries(formData);
    const result = createCommentSchema.safeParse(data);

    if (!result.success) {
        return z.treeifyError(result.error)
            .properties as CreateCommentFormState;
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return {
            _form: ['You must sign in to do this.'],
        };
    }

    try {
        await db.comment.create({
            data: {
                content: result.data.content,
                postId: postId,
                parentId: parentId,
                userId: session.user.id,
            },
        });
    } catch (err) {
        if (err instanceof Error) {
            return {
                _form: [err.message],
            };
        } else {
            return {
                _form: ['Something went wrong...'],
            };
        }
    }

    const topic = await db.topic.findFirst({
        where: { posts: { some: { id: postId } } },
    });

    if (!topic) {
        return {
            _form: ['Failed to revalidate topic'],
        };
    }

    revalidatePath(paths.postShow(topic.slug, postId));
    return {
        success: true,
    };
}
