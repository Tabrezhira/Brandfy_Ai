import { Mic, Paperclip, Send } from 'lucide-react'
import React from 'react'
import { Button } from "@/components/ui/button";
import AiMultiModels from './AiMultiModels';

function ChatinputBox() {
  return (
    <div className=' relative min-h-screen'>
        {/* Page Conetnt */}
        <div>
            <AiMultiModels/>
        </div>
        {/* Fixed Chat Input */}
        <div className='fixed bottom-0 left-0 w-full  flex justify-center px-4 pb-4'>
            <div className='w-full border rounded-xl shadow-md max-w-2xl p-4' >
                <input type="text" placeholder='Ask me anything...' className=' border-0 outline-none'/>
                <div className='mt-3 flex items-center justify-between'>
                    <Button className={""} variant={"ghost"} size={"icon"} >
                        <Paperclip className='h-5 w-5'/>
                    </Button>
                    <div className='flex gap-5'>
                        <Button className={""} variant={"ghost"} size={"icon"}><Mic className='h-5 w-5'/></Button>
                        <Button className={" bg-purple-800"} size={"icon"}><Send className='h-5 w-5'/></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatinputBox