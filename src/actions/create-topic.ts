'use server';
import db from '@/db';
import { z } from 'zod';

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

interface CreateTopicFomState {
    name?: { errors: string[] };
    description?: { errors: string[] };
}

export async function createTopic(
    formState: CreateTopicFomState,
    formData: FormData,
): Promise<CreateTopicFomState> {
    const data = Object.fromEntries(formData.entries());
    const result = TopicSchema.safeParse(data);

    if (!result.success) {
        console.log(z.treeifyError(result.error).properties);
        return z.treeifyError(result.error).properties as CreateTopicFomState;
    }
    return {};

    // await db.topic.create({ data: { description, slug } });
    //TODO: revalidate home page
}
