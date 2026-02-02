import { ReactNode } from 'react'

interface SectionFrameProps {
    title: string
    description: string
    children: ReactNode
}

export function SectionFrame({ title, description, children }: SectionFrameProps) {
    return (
        <main className="flex flex-col w-full h-full">
            <div className="flex items-center justify-between border-b border-border p-6">
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-muted-foreground">
                    {description}
                </p>
            </div>

            {children}
        </main>
    )
}