import React, { useState, useEffect, useMemo, RefObject } from 'react';
import { Message } from 'ai';
import ReferencesCard from "@/src/components/ReferencesCard";
import { Skeleton } from "@chakra-ui/skeleton";
type ChatMessageContainerProps = {
    messages: Message[];
    bottomRef: RefObject<HTMLDivElement>;
};

const ChatMessageContainer: React.FC<ChatMessageContainerProps> = ({ messages, bottomRef }) => {
    const [loading, setLoading] = useState(false);
    const [references, setReferences] = useState([]);

    const referencesKey = useMemo(() => JSON.stringify(messages[0]?.content), [messages]);

    useEffect(() => {
        setLoading(true);
        const cachedReferences = localStorage.getItem(referencesKey);

        if (messages.length !== 0 && !cachedReferences) {
            fetch('/api/references', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages }),
            }).then(res => res.json()).then(data => {
                setReferences(data['references']);
                localStorage.setItem(referencesKey, JSON.stringify(data['references']));
                setLoading(false);
            });
        } else if (cachedReferences) {
            setReferences(JSON.parse(cachedReferences));
            setLoading(false);
        }
    }, [referencesKey, messages]);

    return (
        <div className="overflow-auto mb-40 p-4 space-y-2">
            {messages.map((message) => (
                <div key={message.id} className={`p-2`}>
                    <div className={`inline-block p-3 rounded-lg ${message.role === 'user' ? 'text-3xl' : 'bg-gray-300 text-black'}`}>
                        {message.content}
                    </div>
                    {message.role === 'user' ? (
                        <ReferencesCard references={references} isLoading={loading} />
                    ) : null}
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default ChatMessageContainer;
