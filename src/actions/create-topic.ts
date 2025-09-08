'use server';
import { auth } from '@/auth';
import db from '@/db';
import { z } from 'zod';
import { Topic } from '@/generated/prisma';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

type CreateTopicFormState = {
    name?: { errors: string[] } | undefined;
    description?: { errors: string[] } | undefined;
    _form?: string[];
};

const TopicSchema = z.object({
    name: z
        .string()
        .min(3, { error: 'Name must be at least 3 characters' })
        .regex(/^[a-z-]+$/, {
            error: 'Name must be lower case letters or dashes without spaces',
        }),
    description: z
        .string()
        .min(10, { error: 'Description must be at least 10 characters' }),
});

export async function createTopic(
    actionState: CreateTopicFormState,
    formData: FormData,
): Promise<CreateTopicFormState> {
    const data = Object.fromEntries(formData.entries());
    const result = TopicSchema.safeParse(data);

    if (!result.success) {
        console.log(result.error);
        return z.treeifyError(result.error).properties as CreateTopicFormState;
    }

    const session = await auth();
    if (!session || !session.user)
        return { _form: ['You must be signed in to do this'] };

    let topic: Topic;
    try {
        // artificial delay
        // await new Promise((resolve) => setTimeout(resolve, 2500));

        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { _form: [err.message] };
        } else {
            return { _form: ['Something went wrong'] };
        }
    }

    revalidatePath('/');
    redirect(paths.topicShow(topic.slug));
}
