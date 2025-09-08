import db from '@/db';
import paths from '@/paths';
import { Chip } from '@heroui/chip';
import Link from 'next/link';

export default async function TopicList() {
    const topics = await db.topic.findMany();

    const renderedTopics = topics.map((topic) => {
        return (
            <Link href={paths.topicShow(topic.slug)} key={topic.id}>
                <Chip variant="solid" color="warning">
                    {topic.slug}
                </Chip>
            </Link>
        );
    });

    return <div className="flex flex-wrap gap-2">{renderedTopics}</div>;
}
