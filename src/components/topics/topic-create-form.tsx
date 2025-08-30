import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Input, Textarea } from '@heroui/input';
import { createTopic } from '@/actions';

export default function TopicCreateForm() {
    return (
        <Popover placement="left-start">
            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>

            <PopoverContent>
                <form
                    className="flex flex-col gap-4 p-4 w-80"
                    action={createTopic}
                >
                    <h3 className="text-lg">Create a topic</h3>
                    <Input
                        label="Name"
                        labelPlacement="outside"
                        placeholder="Name"
                        name="name"
                    />

                    <Textarea
                        label="description"
                        labelPlacement="outside"
                        placeholder="Describe you topic"
                        name="description"
                    />
                    <Button type="submit">Create</Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}
