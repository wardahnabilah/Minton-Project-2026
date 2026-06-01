export function InputForm({placeholder, name, label, type, defaultValue, onChange, validationError}) {
    return (
        <div>
            <label className="block mb-2 text-base" htmlFor={name}>{label}</label>
            <input
                onChange={onChange} 
                name={name}
                id={name}
                className="w-full px-7 py-2 text-lg text-primary-dark rounded-2xl bg-primary-light/60 dark:bg-accent-grey outline-none focus:outline-accent-yellow placeholder:text-primary-dark/60" 
                type={type}
                placeholder={placeholder} 
                defaultValue={defaultValue}
            />
            <small className="block pt-2 pl-4 text-lg text-accent-red-danger">{validationError}</small>
        </div>
    )
}