'use client';

import { startTransition, useActionState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Textarea, Button } from '@heroui/react';
import * as actions from '@/actions';

interface CommentCreateFormProps {
    postId: string;
    parentId?: string;
    startOpen?: boolean;
}

export default function CommentCreateForm({
    postId,
    parentId,
    startOpen,
}: CommentCreateFormProps) {
    const [open, setOpen] = useState(startOpen);
    const ref = useRef<HTMLFormElement | null>(null);
    const [actionState, createCommentAction, isPending] = useActionState(
        actions.createComment.bind(null, { postId, parentId }),
        {},
    );

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            createCommentAction(formData);
        });
    }

    useEffect(() => {
        if (actionState.success) {
            ref.current?.reset();

            if (!startOpen) {
                setOpen(false);
            }
        }
    }, [actionState, startOpen]);

    const form = (
        <form onSubmit={handleSubmit} ref={ref}>
            <div className="space-y-2 px-1">
                <Textarea
                    name="content"
                    label="Reply"
                    placeholder="Enter your comment"
                    isInvalid={!!actionState.content}
                    errorMessage={actionState.content?.errors.join(', ')}
                />

                {actionState._form ? (
                    <div className="p-2 bg-red-200 border rounded border-red-400">
                        {actionState._form?.join(', ')}
                    </div>
                ) : null}

                <Button type="submit" isLoading={isPending}>
                    Create Comment
                </Button>
            </div>
        </form>
    );

    return (
        <div className="space-y-2">
            <Button size="sm" variant="light" onClick={() => setOpen(!open)}>
                Reply
            </Button>
            {open && form}
        </div>
    );
}
