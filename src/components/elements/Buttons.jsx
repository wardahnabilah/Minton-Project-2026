import { Link } from "react-router-dom"

export function ButtonLinkSmall({pathName, children: label}) {
    return (
        <Link to={pathName} className="px-4 py-2 rounded-full bg-primary-red shadow-lg hover:bg-primary-red-dark shadow-primary-red/40 text-white">{label}</Link>
    )
}

export function ButtonLink({pathName, children: label}) {
    return (
        <Link to={pathName} className="inline-block px-8 py-2 text-lg text-center rounded-full bg-primary-red shadow-lg hover:bg-primary-red-dark shadow-primary-red/40 text-white">{label}</Link>
    )
}

export function ButtonBtn({onClick, className: addedClass,children: label, disabled}) {
    return (
        <button 
            className={`
                ${addedClass} 
                inline-block 
                px-8 py-2 
                text-lg 
                text-center
                text-white 
                rounded-full 
                bg-primary-red  
                hover:bg-primary-red-dark
                shadow-lg 
                shadow-primary-red/40
                disabled:shadow-none
                disabled:text-white/40
                disabled:bg-accent-darkgrey/70
                dark:disabled:bg-accent-lightgrey/40
            `}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    )
}