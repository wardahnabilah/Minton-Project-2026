import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ButtonOutline } from "../../components/elements/Buttons";
import { CancelBookingModal } from "../../components/modals/bookings/CancelBookingModal";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function HistoryBookingPage() {
    const { loggedInUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [bookingData, setBookingData] = useState([]);
    const [selectedBookingId, setSelectedBookingId] = useState();
    const [isOpen, setIsOpen] = useState({
                                    cancelModal: false,
                                });

    function toggleModal(type, bookingId = null) {
        setSelectedBookingId(bookingId);
        setIsOpen((prev) => {
            return {
                ...prev,
                [type]: !prev[type],
            }
        });
    }

    const getBookings = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/bookings`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${loggedInUser.accessToken}`,
                },
            });

            const data = await response.json();

            setBookingData(data.data);
        } 
        catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        getBookings();
    },[]);

    return (
        <>
            <section className="py-28">
                <h1 className="text-2xl text-center font-bold uppercase tracking-wider mb-10">Booking History</h1>
                <table className="table w-4/5 mx-auto border border-gray-400 bg-black">
                    <thead>
                        <tr>
                            <th className="border border-gray-400">Booking Id</th>
                            <th className="border border-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookingData?.length ?
                                bookingData?.map((item) => {
                                    return (
                                        <tr>
                                            <td className="p-5 border border-gray-400 text-center">#{item.id}</td>
                                            <td className="p-5 border border-gray-400 text-center">
                                                <ButtonOutline color="primary-red" onClick={() => toggleModal('cancelModal', item.id)}>Cancel Booking</ButtonOutline>
                                            </td>
                                        </tr>
                                    );
                                })
                                
                                : <tr><td colSpan="3" className="text-center">Data not found</td></tr>
                        }
                    </tbody>
                </table>
            </section>
            { isOpen.cancelModal && <CancelBookingModal bookingId={selectedBookingId} closeModal={() => toggleModal('cancelModal')} getBookings={getBookings} /> }
        </>
    );
}