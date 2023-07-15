import EmptyState from '@/app/(site)/components/EmptyState';
import getConversationById from '@/app/actions/getConversationById';
import getMessage from '@/app/actions/getMessage';
import React from 'react'
import Header from './Components/Header';

interface IParams{
    conversationId: string;
}
const ConversationId = async({params}:{params: IParams}) => {
    const conversion = await getConversationById(params.conversationId);
    const messages = await getMessage(params.conversationId)

    if(!conversion){
        return(
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState/>
                </div>
            </div>
        )
    }
  return (
    <div className='lg:pl-80 h-full'>
        <div className="h-full flex flex-col">
            <Header conversion={conversion}/>
        </div>
    </div>
  )
}

export default ConversationId