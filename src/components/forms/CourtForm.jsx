import { InputForm } from "../elements/InputForm";
import { ButtonFilled } from "../elements/Buttons";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CourtForm({ courtId = null, courtNameVal = null, isEdit = null, closeModal, getCourtSchedules }) {
    const {loggedInUser} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({name: courtNameVal});

    const saveCourt = async () => {
        let method = 'POST';
        let url = `${BASE_URL}/courts`;

        if(isEdit) {
            method = 'PUT';
            url += `/${courtId}`;
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
        getCourtSchedules();
    }

    function handleSubmit(e) {
        e.preventDefault();

        saveCourt(formData);
    }

    return (
        <>
            <p>{ isEdit ? 'Edit' : ''} Court Name</p>
            <form onSubmit={handleSubmit}>
                <InputForm
                        label=""
                        name="name"
                        type="text"
                        defaultValue={courtNameVal}
                        onChange={e => {setFormData({name: e.target.value})}}
                />
                <ButtonFilled size="sm" variant="secondary" onClick={closeModal} className="mr-4">Cancel</ButtonFilled>
                <ButtonFilled size="sm" variant="primary" isLoading={isLoading}>Save</ButtonFilled>
            </form>
        </>
    );
}