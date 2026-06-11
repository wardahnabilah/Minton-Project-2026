import { useContext, useState } from "react";
import { ButtonFilled } from "../../elements/Buttons";
import { AuthContext } from "../../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function DeleteModal({ courtId, closeModal, getCourtSchedules,children }) {
    const {loggedInUser} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);


    const deleteCourt = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/courts/${courtId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${loggedInUser.accessToken}`,
                    'Content-Type'  : 'application/json',
                    'Accept'        : 'application/json',
                }
            });
            const data = await response;

        } catch (e) {
            setIsLoading(false);
            console.log(e);
        }

        closeModal();
        getCourtSchedules();
    }

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors bg-black/60`}>
            <div className="bg-white text-primary-dark rounded-2xl shadow px-6 py-4 transition-all">
                <button onClick={closeModal} className="float-right">x</button>
                <div className="text-center mt-10">
                    Are you sure you want to delete this court ? <br /><br />
                    <ButtonFilled size="sm" variant="secondary" onClick={closeModal} className="mr-4">Cancel</ButtonFilled>
                    <ButtonFilled size="sm" variant="primary" onClick={deleteCourt} isLoading={isLoading}>Delete</ButtonFilled>
                </div>
            </div>
        </div>
    )
}