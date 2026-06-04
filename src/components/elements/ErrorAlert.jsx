export function ErrorAlert({message}) {
    return  <p className={`mt-10 text-center text-lg text-accent-red-danger ${!message && 'hidden'}`}>{message}</p>
}