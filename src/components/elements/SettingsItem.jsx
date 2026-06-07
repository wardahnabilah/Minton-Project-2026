export function SettingsItem({title}) {
    return (
        <a href="#" class="bg-neutral-primary-soft inline-block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium">
            <h5 class="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8 uppercase">{title}</h5>
        </a>
    )
}