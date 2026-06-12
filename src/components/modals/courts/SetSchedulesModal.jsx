import { useContext, useEffect, useState } from "react";
import { ButtonFilled } from "../../elements/Buttons";
import { AuthContext } from "../../../context/AuthContext";
import { SetScheduleForm } from "../../forms/SetScheduleForm";

export function SetSchedulesModal({ court, courtName = null, isOpen, closeModal, getCourts, children }) {
    const courtSchedule = court?.court_schedule;

    return (
        <div className={`fixed inset-0 flex justify-center items-center transition-colors bg-black/60`}>
            <div className="bg-white text-primary-dark rounded-2xl shadow px-6 py-4 transition-all">
                <button onClick={closeModal} className="float-right">x</button>
                <div className="mt-10">
                    {
                        <SetScheduleForm 
                                isEdit={ courtSchedule ? true : false }
                                courtId={court.id} 
                                courtSchedule={courtSchedule} 
                                closeModal={closeModal}
                                getCourts={getCourts} />
                    }
                </div>
            </div>
        </div>
    )
}