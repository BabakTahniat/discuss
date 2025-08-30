'use client';
import { Button } from '@heroui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Input, Textarea } from '@heroui/input';
import { createTopic } from '@/actions';
import { startTransition, useActionState } from 'react';

export default function TopicCreateForm() {
    const [formState, action] = useActionState(createTopic, {});

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    }

    return (
        <Popover placement="left-start" className="dark">
            <PopoverTrigger>
                <Button color="primary">Create a Topic</Button>
            </PopoverTrigger>

            <PopoverContent>
                <form
                    className="flex flex-col gap-4 p-4 w-80"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <h3 className="text-lg">Create a topic</h3>
                    <Input
                        label="Name"
                        labelPlacement="outside"
                        placeholder="Name"
                        name="name"
                        isInvalid={!!formState.name}
                        errorMessage={formState.name?.errors.join('.\n')}
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
