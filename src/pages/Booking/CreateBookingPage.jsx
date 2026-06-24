import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ButtonFilled } from "../../components/elements/Buttons";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CreateBookingPage() {
    const { loggedInUser } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const navigateTo = useNavigate();
    const location = useLocation();
    const selectedSchedule = location.state.selectedSchedule;

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${loggedInUser.accessToken}`,
                },
                body: JSON.stringify({
                    'court_schedule_id': selectedSchedule.id,
                    'date': selectedSchedule.date,
                    'start_time': selectedSchedule.slot.start_time,
                    'end_time': selectedSchedule.slot.end_time,
                }),
            });

            const data = await response.json();
        } 
        catch (e) {
            console.log(e);
        }

        setIsLoading(false);
        navigateTo('/booking-history');
    }

    return (
        <>
            <section className="py-28">
                <h1 className="text-2xl text-center font-bold uppercase tracking-wider mb-10">Booking Confirmation</h1>
                <div className="flex flex-col mx-auto p-15 w-150 border border-primary-light rounded-4xl ">
                    <h4 className="text-xl font-semibold mb-3">Customer Details</h4>
                    <table className="table w-full mb-10">
                        <tbody>
                            <tr>
                                <td className="w-30">Name</td>
                                <td>:</td>
                                <td>{loggedInUser.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{loggedInUser.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    

                    <h4 className="text-xl font-semibold mb-3">Booking Details</h4>
                    <table className="table w-full mb-5">
                        <tbody>
                            <tr>
                                <td className="w-30">Court</td>
                                <td>:</td>
                                <td>{selectedSchedule.courtName}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>:</td>
                                <td>{selectedSchedule.day}, {selectedSchedule.date}</td>
                            </tr>
                            <tr>
                                <td>Start Time</td>
                                <td>:</td>
                                <td>{selectedSchedule.slot.start_time}</td>
                            </tr>
                            <tr>
                                <td>End Time</td>
                                <td>:</td>
                                <td>{selectedSchedule.slot.end_time}</td>
                            </tr>
                        </tbody>
                    </table>
                    <ButtonFilled onClick={handleSubmit} isLoading={isLoading} variant="primary" size="md" className="mt-10">Submit</ButtonFilled>
                </div>
            </section>
        </>
    );
}