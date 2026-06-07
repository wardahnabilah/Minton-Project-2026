import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function SettingsCourtPage() {
    const [courtSchedules, setCourtSchedules] = useState([]);
    const {loggedInUser, setLoggedInUser} = useContext(AuthContext);

    useEffect(() => {
        const getCourtSchedules = async () => {
            const response = await fetch(`${BASE_URL}/courts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${loggedInUser?.accessToken}`,
                }
            });
            const data = await response.json();

            setCourtSchedules(data.data);
        }

        getCourtSchedules();
    }, []);

    return (
        <section className="p-28 mx-auto">
            <table className="w-full border border-gray-400 table-fixed mx-auto">
                <thead>
                    <tr>
                        <th className="w-15 border border-gray-400">No.</th>
                        <th className="w-40 border border-gray-400">Court Name</th>
                        <th className="w-40 border border-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        courtSchedules?.map((item, i) => {
                            return (
                                <tr>
                                    <td className="border border-gray-400 text-center">{i+1}</td>
                                    <td className="pl-5 py-3 border border-gray-400">{item?.name}</td>
                                    <td className="pl-5 py-3 border border-gray-400"></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </section>
    );
}