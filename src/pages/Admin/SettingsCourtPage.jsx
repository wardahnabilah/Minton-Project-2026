import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DeleteModal } from "../../components/modals/courts/DeleteModal";
import { CreateEditModal } from "../../components/modals/courts/CreateEditModal";
import { ButtonFilled, ButtonOutline } from "../../components/elements/Buttons";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function SettingsCourtPage() {
    const [courts, setCourts] = useState([]);
    const [isOpen, setIsOpen] = useState({
                                    createEditModal: false,
                                    deleteModal: false,
                                });
    const [selectedCourt, setSelectedCourt] = useState();
    const {loggedInUser, setLoggedInUser} = useContext(AuthContext);

    const getCourts = async () => {
            const response = await fetch(`${BASE_URL}/courts`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${loggedInUser?.accessToken}`,
                }
            });
            const data = await response.json();

            setCourts(data.data);
        }

    useEffect(() => {
        getCourts();
    }, []);

    function toggleModal(type, court) {
        setSelectedCourt(court);
        setIsOpen((prev) => {
            return {
                ...prev,
                [type]: !prev[type],
            }
        });
    }
    

    return (
      <>
        <section className="p-28 mx-auto">
            <ButtonFilled variant="info" size="sm" className="float-right mb-5" onClick={() => toggleModal('createEditModal')}>+ Add New Court</ButtonFilled>
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
                        courts?.length ? 
                        courts.map((item, i) => {
                            return (
                                <tr key={item.id}>
                                    <td className="border border-gray-400 text-center">{i+1}</td>
                                    <td className="pl-5 py-3 border border-gray-400">{item?.name}</td>
                                    <td className="pl-5 py-3 border border-gray-400">
                                        <ButtonOutline color="primary-light">Set Schedules</ButtonOutline>
                                        <ButtonOutline color="accent-yellow" onClick={() => toggleModal('createEditModal', item)}>Edit</ButtonOutline>
                                        <ButtonOutline color="primary-red" onClick={() => toggleModal('deleteModal', item)}>Delete</ButtonOutline>
                                    </td>
                                </tr>
                            );
                        })
                        : <tr><td colSpan="3" className="text-center">Data not found</td></tr>
                    }
                </tbody>
            </table>
        </section>
        { isOpen.createEditModal && <CreateEditModal courtId={selectedCourt?.id} courtName={selectedCourt?.name} closeModal={() => toggleModal('createEditModal')} getCourts={getCourts} /> }
        { isOpen.deleteModal && <DeleteModal courtId={selectedCourt?.id} closeModal={() => toggleModal('deleteModal')} getCourts={getCourts} /> }
      </>
    );
}