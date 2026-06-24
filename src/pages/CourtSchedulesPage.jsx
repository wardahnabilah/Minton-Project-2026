import { useLocation } from "react-router";
import { ButtonLinkSmall } from "../components/elements/Buttons";
import { ErrorAlert } from "../components/elements/ErrorAlert";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Pagination } from "../components/elements/Pagination";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CourtSchedulesPage() {
    const {loggedInUser} = useContext(AuthContext);
    const [courtsSchedules, setCourtSchedules] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [paginationData, setPaginationData] = useState({});

    const getCourtSchedules = async (page = null) => {
        setIsLoading(true);
        let url = `${BASE_URL}/schedules`;
        if(page) url += `?page=${page}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept' : 'application/json',
                }
            });

            const data = await response.json();

            setCourtSchedules(data.data);
            setPaginationData(data.meta);
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        getCourtSchedules();
    }, []);

    return (
        <section className="h-screen bg-[url('./assets/images/bg-hero.png')] bg-cover">
            <div className="absolute top-40 md:inset-x-5 lg:inset-x-20">
                <h1 className="text-2xl text-center font-bold uppercase tracking-wider mb-10">Court Schedules</h1>
                {isLoading && <div className="text-center my-5">Loading...</div> }
                <table className="table w-4/5 mx-auto border border-gray-400 bg-black">
                    <thead>
                        <tr>
                            <th className="border border-gray-400">No</th>
                            <th className="border border-gray-400">Court</th>
                            <th className="border border-gray-400">Date</th>
                            <th className="border border-gray-400">Start Time</th>
                            <th className="border border-gray-400">End Time</th>
                            <th className="border border-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            courtsSchedules ?.map((courtSchedule, i) => {
                                let courtName = courtSchedule?.court?.name;

                                return (
                                    <>
                                        {
                                            courtSchedule?.slots?.map((slot, j) => {
                                                return (
                                                    <tr key={`schedule-item-${j}`}>
                                                        { (j === 0) ? 
                                                            <>
                                                                <td className="border border-gray-400">{ (paginationData.current_page - 1) * paginationData.per_page + i + 1}</td>
                                                                <td className="border border-gray-400">{courtName}</td>
                                                            </>
                                                            : 
                                                                <td colSpan={2}></td>
                                                        }
                                                            <td className="border border-gray-400">{courtSchedule.date}</td>
                                                            <td className="border border-gray-400">{slot.start_time}</td>
                                                            <td className="border border-gray-400">{slot.end_time}</td>
                                                            <td className="border border-gray-400 py-5">
                                                                {
                                                                    slot.status === 'available' ? <ButtonLinkSmall 
                                                                                                                pathName={`/create-booking`}
                                                                                                                state={{
                                                                                                                    selectedSchedule: {
                                                                                                                        courtName: courtName,
                                                                                                                        id: courtSchedule.id,
                                                                                                                        day: courtSchedule.day,
                                                                                                                        date: courtSchedule.date,
                                                                                                                        slot: slot,
                                                                                                                    }
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
                <Pagination paginationData={paginationData} clickPageNum={getCourtSchedules} />
            </div>
        </section>
    )
}