'use server';

import { auth } from '@/auth';
import db from '@/db';
import type { Post } from '@/generated/prisma';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import z from 'zod';

type CreatePostFormState = {
    title?: { errors: string[] } | undefined;
    content?: { errors: string[] } | undefined;
    _form?: string[];
};

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
});

export async function createPost(
    slug: string,
    actionState: CreatePostFormState,
    formData: FormData,
): Promise<CreatePostFormState> {
    const data = Object.fromEntries(formData);
    const result = createPostSchema.safeParse(data);

    if (!result.success) {
        console.log(z.treeifyError(result.error).properties);
        return z.treeifyError(result.error).properties as CreatePostFormState;
    }

    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return { _form: ['You must be logged in to do this'] };
    }

    const topic = await db.topic.findFirst({ where: { slug } });
    if (!topic) return { _form: ['Cannot find topic'] };

    let post: Post;
    try {
        // Artificial delay
        new Promise((resolve) => setTimeout(resolve, 2500));

        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            },
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { _form: [error.message] };
        } else {
            return { _form: ['Something went wrong'] };
        }
    }

    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
}
