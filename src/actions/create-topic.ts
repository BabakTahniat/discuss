'use server';

import db from '@/db';

export async function createTopic(formData: FormData) {
    const name = formData.get('name');
    const description = formData.get('description');
    // await db.topic.create({ data: { description, slug } });
    //TODO: revalidate home page
}
