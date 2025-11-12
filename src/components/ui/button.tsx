import clsx from 'clsx'
import React from 'react'

type ButtonProps = {
    children: React.ReactNode,
    className?: string,
    disabled?: boolean,
    active?: boolean,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    variant?: 'primary' | 'nav' | 'outline' | 'success'
}

export const Button = ({ children, className, disabled, active, onClick, variant = 'primary' }: ButtonProps) => {

    const variants: Record<string, string> = {
        'primary': 'bg-[var(--primary)] text-white active:brightness-90',
        'success': 'bg-green-600 text-white',
        'nav': "bg-transparent text-[var(--foreground)] hover:bg-[#77777740] !rounded-lg active:text-white",
        'outline': "bg-transparent !border-[var(--primary)] border-2 rounded-md p-2 "
    }

    return (
        <button className={clsx('hover:brightness-120 disabled:brightness-70 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 rounded-xl active:scale-95', 'flex items-center gap-2  px-4 py-2 border-transparent', active && 'bg-(--primary)! text-white', variants[variant], className)} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}