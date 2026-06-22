import { useLocation } from "react-router";
import { ButtonLinkSmall } from "../components/elements/Buttons";
import { ErrorAlert } from "../components/elements/ErrorAlert";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CourtSchedulesPage() {
    const {loggedInUser} = useContext(AuthContext);
    const [courtsSchedules, setCourtSchedules] = useState();

    const getCourtSchedules = async () => {
        try {
            const response = await fetch(`${BASE_URL}/schedules`, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                }
            });

            const data = await response.json();

            setCourtSchedules(data.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCourtSchedules();
    }, []);

    return (
        <section className="h-screen bg-[url('./assets/images/bg-hero.png')] bg-cover">
            <div className="absolute top-40 md:inset-x-5 lg:inset-x-20">
                <h1 className="text-2xl text-center font-bold uppercase tracking-wider mb-10">Court Schedules</h1>
                <table className="table w-4/5 mx-auto border border-gray-400 bg-black">
                    <thead>
                        <tr>
                            <th className="border border-gray-400">No</th>
                            <th className="border border-gray-400">Court</th>
                            <th className="border border-gray-400">Day</th>
                            <th className="border border-gray-400">Start Time</th>
                            <th className="border border-gray-400">End Time</th>
                            <th className="border border-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            courtsSchedules?.map((courtSchedule, i) => {
                                return (
                                    <>
                                        {
                                            courtSchedule?.schedules?.map((scheduleItem, j) => {
                                                let courtName = courtSchedule?.court?.name;

                                                return (
                                                    <tr key={`schedule-item-${j}`}>
                                                        { (j === 0) ? 
                                                            <>
                                                                <td className="border border-gray-400">{i+1}</td>
                                                                <td className="border border-gray-400">{courtName}</td>
                                                            </>
                                                            : 
                                                                <td colSpan={2}></td>
                                                        }
                                                            <td className="border border-gray-400">{scheduleItem.day}</td>
                                                            <td className="border border-gray-400">{scheduleItem.start_time}</td>
                                                            <td className="border border-gray-400">{scheduleItem.end_time}</td>
                                                            <td className="border border-gray-400 py-5">
                                                                {
                                                                    scheduleItem.status === 'available' ? <ButtonLinkSmall 
                                                                                                                pathName={`/create-booking`}
                                                                                                                state={{
                                                                                                                    courtScheduleId : courtSchedule.id,
                                                                                                                    courtName : courtName,
                                                                                                                    scheduleItem: scheduleItem,
                                                                                                                }}
                                                                                                            >Booking Now</ButtonLinkSmall>
                                                                                                            : 'Booked'
                                                                }
                                                            </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}