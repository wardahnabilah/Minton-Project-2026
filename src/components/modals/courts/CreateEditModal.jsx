import { useContext, useEffect, useState } from "react";
import { ButtonFilled } from "../../elements/Buttons";
import { AuthContext } from "../../../context/AuthContext";
import { CourtForm } from "../../forms/CourtForm";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CreateEditModal({ courtId, isOpen, closeModal, getCourtSchedules,children }) {
    const {loggedInUser} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [court, setCourt] = useState();
    
    // get court data for form value
    useEffect(() => {
        const getCourt = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(`${BASE_URL}/courts/${courtId}`, {
                    headers: {
                        'Authorization' : `Bearer ${loggedInUser.accessToken}`,
                        'Content-Type'  : 'application/json',
                        'Accept'        : 'application/json',
                    }
                });
                const data = await response.json();
                setCourt(data.data);
            } catch (e) {
                console.log(e);
            }

            setIsLoading(false);
        }

        if(courtId) {
            getCourt();
        }
    }, [courtId]);

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors bg-black/60`}>
            <div className="w-90 h-50 bg-white text-primary-dark rounded-2xl shadow px-6 py-4 transition-all">
                <button onClick={closeModal} className="float-right">x</button>
                <div className="text-center mt-10">
                    {
                        !isLoading ? 
                            <CourtForm 
                                isEdit={ courtId ? true : false }
                                courtId={courtId} 
                                courtNameVal={court?.name} 
                                closeModal={closeModal}
                                getCourtSchedules={getCourtSchedules} />
                            : <span>Loading...</span>
                    }
                </div>
            </div>
        </div>
    )
}