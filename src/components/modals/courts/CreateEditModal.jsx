import { useContext, useEffect, useState } from "react";
import { ButtonFilled } from "../../elements/Buttons";
import { AuthContext } from "../../../context/AuthContext";
import { CourtForm } from "../../forms/CourtForm";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CreateEditModal({ courtId, courtName = null, isOpen, closeModal, getCourtSchedules, children }) {
    const {loggedInUser} = useContext(AuthContext);
    const [court, setCourt] = useState();

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors bg-black/60`}>
            <div className="w-90 h-50 bg-white text-primary-dark rounded-2xl shadow px-6 py-4 transition-all">
                <button onClick={closeModal} className="float-right">x</button>
                <div className="text-center mt-10">
                    {
                        <CourtForm 
                                isEdit={ courtId ? true : false }
                                courtId={courtId} 
                                courtNameVal={courtName} 
                                closeModal={closeModal}
                                getCourtSchedules={getCourtSchedules} />
                    }
                </div>
            </div>
        </div>
    )
}