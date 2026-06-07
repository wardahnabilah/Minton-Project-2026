import { Link } from "react-router-dom";

export function MenuButton({title, pathName}) {
    return (
        <Link
            to={pathName}
            className="
                w-50
                h-25
                flex
                items-center
                justify-center
                border-4
                border-white
                rounded-3xl
                mx-auto
                my-20
                text-2xl
                hover:bg-white/20
            "
        >{title}</Link>
    );
}