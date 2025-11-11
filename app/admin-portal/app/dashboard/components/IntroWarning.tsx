import Image from 'next/image'

import { Button } from '@/components/shadcn/ui/button'
import { Dispatch, SetStateAction } from 'react'

import { BookAlert, AlertTriangle } from 'lucide-react'

// iffy implementation for dismissing, should prob encapsulate all in here
// edit: or maybe not, maybe it's good to let the component dismiss self-determinatively
export function IntroWarning({onConfirm}: {onConfirm: Dispatch<SetStateAction<boolean>>}) {

    return (
        <div className="w-full min-w-[300px] h-screen flex flex-col items-center justify-center gap-4">
            <AlertTriangle className="absolute text-white my-2 opacity-[2%] pointer-events-none" size={512} />
            <Image className="absolute w-full h-screen object-cover opacity-5 pointer-events-none" src="/bits/background.svg" alt="" width={1920} height={1080}></Image>

            <div className="flex flex-col items-center justify-center text-center">

                <BookAlert className="text-amber-400 animate-pulse" size={36} />
                <h1 className="text-5xl font-bold text-amber-400 animate-pulse py-2">WARNING</h1>

                <h2 className="text-xl">This site contains <span className="italic">confidential information.</span></h2>
                <h2 className="text-xl">Exercise caution in public spaces—this interface should be for your eyes only!</h2>
            </div>
            <Button className="active:scale-95" onDoubleClick={() => { onConfirm(true) }}>Double Click to Continue</Button>
        </div>
    )
}