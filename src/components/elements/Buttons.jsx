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

export function ButtonFilled({onClick, size, variant, loading, disabled, className: addedClass, children: label}) {
    const variants = {
        primary: 'bg-primary-red hover:bg-primary-red-dark shadow-primary-red/40',
        secondary: 'bg-accent-grey hover:bg-accent-lightgrey shadow-accent-darkgrey/40'
    }
    
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-5 py-1 text-md',
        lg: 'px-8 py-2 text-lg',
    }
    
    return (
        <button 
            className={`
                ${variants[variant]}
                ${sizes[size]}
                ${addedClass} 
                inline-block 
                text-center
                text-white 
                rounded-full 
                shadow-lg 
                disabled:shadow-none
                disabled:text-white/40
                disabled:bg-accent-darkgrey/70
            `}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    )
}