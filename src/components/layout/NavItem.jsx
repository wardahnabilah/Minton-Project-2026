export function NavItem({children, className}) {
    return (
        <li 
            className={`${className} group py-4 md:py-0 pl-12 md:pl-10 border-b md:border-none hover:text-accent-yellow hover:cursor-pointer`}>
            {children}
        </li>
    )
}