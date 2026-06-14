import { useContext, useState } from "react";
import { ButtonFilled } from "../../elements/Buttons";
import { AuthContext } from "../../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CancelBookingModal({ bookingId, closeModal, getBookings, children }) {
    const {loggedInUser} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const deleteBooking = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
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
        getBookings();
    }

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors bg-black/60`}>
            <div className="bg-white text-primary-dark rounded-2xl shadow px-6 py-4 transition-all">
                <button onClick={closeModal} className="float-right">x</button>
                <div className="text-center mt-10">
                    Are you sure you want to cancel this booking ? <br /><br />
                    <ButtonFilled size="sm" variant="secondary" onClick={closeModal} className="mr-4">No</ButtonFilled>
                    <ButtonFilled size="sm" variant="primary" onClick={deleteBooking} isLoading={isLoading}>Yes</ButtonFilled>
                </div>
            </div>
        </div>
    )
}