import { MenuButton } from "../../components/elements/MenuButton";

export function AdminPage() {
    return (
        <section className="p-28 mx-auto">
            <h1 className="text-3xl text-center text-white font-bold uppercase tracking-wider">Settings</h1>
            <MenuButton pathName="/admin/courts" title="Courts" />
        </section>
    );
}