import { InputForm } from "../elements/InputForm";
import { SelectForm } from "../elements/SelectForm";
import { ButtonFilled } from "../elements/Buttons";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function SetScheduleForm({ courtId = null, courtSchedule = null, isEdit = null, closeModal, getCourts }) {
    const {loggedInUser} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        court_id: courtId,
        day: courtSchedule?.day,
        open_time: courtSchedule?.open_time,
        close_time: courtSchedule?.close_time,
    });

    const saveSchedule = async () => {
        let method = 'POST';
        let url = `${BASE_URL}/schedules`;

        if(isEdit) {
            method = 'PUT';
            url += `/${courtSchedule.id}`
        }

        setIsLoading(true);

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization' : `Bearer ${loggedInUser.accessToken}`,
                    'Content-Type'  : 'application/json',
                    'Accept'        : 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
        } catch (e) {
            console.log(e);
        }

        setIsLoading(false);
        closeModal();
        getCourts();
    }

    function handleSubmit(e) {
        e.preventDefault();
        saveSchedule(formData);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td className="w-25">Day</td>
                            <td className="w-2">:</td>
                            <td className="w-40">
                                <SelectForm
                                    label=""
                                    name="day"
                                    defaultValue={formData.day}
                                    options={['monday','tuesday','wednesday','thursday','friday','saturday','sunday']}
                                    onChange={e => {setFormData((prev) => ({...prev, day: e.target.value}))}}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Open Time</td>
                            <td>:</td>
                            <td>
                                <InputForm
                                    label=""
                                    name="open_time"
                                    type="time"
                                    min="06:00"
                                    max="22:00"
                                    step="3600"
                                    defaultValue={formData.open_time}
                                    onChange={e => {setFormData((prev) => ({...prev, open_time: e.target.value}))}}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Close Time</td>
                            <td>:</td>
                            <td>
                                <InputForm
                                    label=""
                                    name="close_time"
                                    type="time"
                                    min="06:00"
                                    max="22:00"
                                    step="3600"
                                    defaultValue={formData.close_time}
                                    onChange={e => {setFormData((prev) => ({...prev, close_time: e.target.value}))}}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="text-center mt-5">
                    <ButtonFilled size="sm" variant="secondary" onClick={closeModal} className="mr-4">Cancel</ButtonFilled>
                    <ButtonFilled size="sm" variant="primary" isLoading={isLoading}>Save</ButtonFilled>
                </div>
            </form>
        </>
    );
}