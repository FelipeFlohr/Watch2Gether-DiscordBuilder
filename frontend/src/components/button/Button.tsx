import React from "react"

export default function Button(props: ButtonProps) {
    return (
        <button className={`w-12 h-12 rounded-full f-1 text-2xl ${props.enabled ? `bg-orange-500` : `bg-gray-600`} hover:${props.enabled ? `bg-orange-400` : `bg-gray-500`}`} onClick={props.onClick}>
            { props.children }
        </button>
    )
}

type ButtonProps = {
    children: any
    enabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}