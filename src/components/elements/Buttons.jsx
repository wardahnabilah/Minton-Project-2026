import { Link } from "react-router-dom"

export function ButtonLinkSmall({pathName, state, children: label}) {
    return (
        <Link to={pathName} state={state} className="px-4 py-2 rounded-full bg-primary-red shadow-lg hover:bg-primary-red-dark shadow-primary-red/40 text-white">{label}</Link>
    )
}

export function ButtonLink({pathName, children: label}) {
    return (
        <Link to={pathName} className="inline-block px-8 py-2 text-lg text-center rounded-full bg-primary-red shadow-lg hover:bg-primary-red-dark shadow-primary-red/40 text-white">{label}</Link>
    )
}

export function ButtonFilled({onClick, size, variant, isLoading, className: addedClass, children: label}) {
    const variants = {
        primary: 'bg-primary-red hover:bg-primary-red-dark shadow-primary-red/40',
        secondary: 'bg-accent-lightgrey hover:bg-accent-darkgrey/60 shadow-accent-darkgrey/40',
        info: 'bg-primary-light/70 hover:bg-primary-light/40 shadow-accent-darkgrey/40',
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
            disabled={isLoading}
            onClick={onClick}
        >
            { !isLoading ? label : 'Loading...'}
        </button>
    )
}

export function ButtonOutline({onClick, className: addedClass, loading, color, children: label}) {
    const lightColors = ['accent-yellow'];
    const colors = { // color classes for tailwind
        'primary-light': 'border-primary-light hover:bg-primary-light',
        'accent-yellow': 'border-accent-yellow hover:bg-accent-yellow',
        'primary-red': 'border-primary-red hover:bg-primary-red',
    };

    return (
        <button 
            className={`
                mr-2
                px-3 
                py-1 
                border-2
                border-${color}
                hover:bg-${color}
                text-white
                ${lightColors.includes(color) && 'hover:text-primary-dark'}
                rounded-xl
                ${addedClass}
            `}
            onClick={onClick}
        >
            { label }
        </button>
    );
}