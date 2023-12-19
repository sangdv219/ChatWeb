"use client";

import useConversation from "@/app/hook/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox.client";
import { User } from "@prisma/client";
import GroupChatModal from "./GroupChatModal.client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
interface ConversationListProps {
  users: any;
  initialItems: any;
}
const ConversationList: React.FC<ConversationListProps> = ({
  users,
  initialItems,
}) => {
  const { conversationId, isOpen } = useConversation();
  const session = useSession();
  const [items, setItems] = useState(initialItems);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current:any) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }
        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current:any) => current.map((currentConversation:any) => {
        if(currentConversation.id === conversation.id){
          return {
            ...currentConversation,
            messages: conversation.message
          }
        }
        return currentConversation;
      }))
    }

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current:any) => {
        return [...current.filter((convo:any) => convo.id !== conversation.id)]
      })

      if(conversationId === conversation.id){
        router.push('/conversations')
      }
    }

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
                fixed 
                inset-y-0
                pb-20
                lg:pb-0
                lg:left-20
                lg:w-80
                lg:block
                overflow-y-auto
                border-r
                border-gray-200
                `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between my-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd />
            </div>
          </div>
          {items.map((item: any) => (
            <ConversationBox
              key={item.id}
              data={item}
              selected={conversationId}
            />
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
