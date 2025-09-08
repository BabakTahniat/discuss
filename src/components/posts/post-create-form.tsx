'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { startTransition, useActionState } from 'react';
import * as actions from '@/actions';

type PostCreateFromProps = {
    slug: string;
};

export default function PostCreateForm({ slug }: PostCreateFromProps) {
    const [actionState, createPostAction, isPending] = useActionState(
        actions.createPost.bind(null, slug),
        {},
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            createPostAction(formData);
        });
    }

    return (
        <Popover placement="left-start">
            <PopoverTrigger>
                <Button color="primary">Create a post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form
                    className="flex flex-col gap-4 p-4 w-80"
                    onSubmit={handleSubmit}
                >
                    <h3 className="text-lg">Create a post</h3>
                    <Input
                        label="Title"
                        labelPlacement="outside"
                        placeholder="Title"
                        name="title"
                        isInvalid={!!actionState.title}
                        errorMessage={actionState.title?.errors.join(', ')}
                    />
                    <Textarea
                        label="Content"
                        labelPlacement="outside"
                        placeholder="Content"
                        name="content"
                        isInvalid={!!actionState.content}
                        errorMessage={actionState.content?.errors.join(', ')}
                    />
                    {actionState._form ? (
                        <div className="rounded-xl bg-red-200 border border-red-400 p-2">
                            {actionState._form.join(', ')}
                        </div>
                    ) : null}
                    <Button type="submit" isLoading={isPending}>
                        Create a post
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}
