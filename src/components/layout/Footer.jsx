export function Footer() {
    const year = new Date().getFullYear()
    
    return (
        <footer className="mt-auto py-3 text-center text-white bg-header-dark">
            <p>Copyright { year } Minton. All rights reserved.</p>
        </footer>
    )
}