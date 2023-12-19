"use client";

import useConversation from '@/app/hook/useConversation';
import { FullMessageType } from '@/app/types';
import React, { useState, useRef, useEffect } from 'react'
import MessageBox from './MessageBox.client';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash'
interface IBodyProps {
  initialMessages: FullMessageType[]
}

const Body:React.FC<IBodyProps> = ({initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState();
  const { conversationId } = useConversation()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();
    
    const messageHandler = (message: FullMessageType) => {
     setMessages((current)=>{
      if(find(current, { id: message.id })){
        return current
      }
      return [...current, message];
     })

     bottomRef?.current?.scrollIntoView()
    }


    const updateMessgeHandler = (newMessage: FullMessageType) => {
      setMessages((current) => {
        return current.map((currentMessage) => {
          if(currentMessage.id === currentMessage.id){
            return newMessage
          }
        })
      })
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('messages:update', updateMessgeHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessgeHandler)
    }
  }, [conversationId]);


  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div
        ref={bottomRef} 
        className="pt-24"/>
    </div>
  )
}

export default Body;