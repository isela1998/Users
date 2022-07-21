import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UsersForm = ({ getUsers, userSelected, clearSelection, visibilityForm, show, title }) => {
    const handleClose = () => visibilityForm(false);
    const handleShow = () => visibilityForm(true);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (userSelected !== null) {
            handleShow()
            reset({
                first_name: userSelected.first_name,
                last_name: userSelected.last_name,
                birthday: userSelected.birthday,
                email: userSelected.email,
                password: userSelected.password
            })
        }
    }, [userSelected]);

    useEffect(() => {
        if (show === true) {
            handleShow()
        }
    }, [show]);

    const defaultValues = {
        first_name: "",
        last_name: "",
        birthday: "",
        email: "",
        password: ""
    }

    const clear = () => {
        reset(defaultValues)
        clearSelection()
    };

    const hideForm = () => {
        handleClose()
        clear()
    }

    const submit = data => {
        if (userSelected !== null) {
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
                .then(() => {
                    getUsers()
                    reset(defaultValues)
                    clearSelection()
                    handleClose()
                });
        } else {
            axios.post("https://users-crud1.herokuapp.com/users/", data)
                .then(() => {
                    getUsers()
                    reset(defaultValues)
                    handleClose()
                })
                .catch((error) => console.log(error.response));
        }
    };

    return (
        <>
            <Modal show={show} onHide={hideForm} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title-form">{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="inputs-container">
                            <input placeholder="First name" type="text" id="firstName" {...register("first_name")} autoComplete="off" required />
                            <input placeholder="Last name" type="text" id="lastName" {...register("last_name")} autoComplete="off" required />
                            <input placeholder="Email" type="email" id="email" {...register("email")} required />
                            <input placeholder="Password" type="password" id="password" {...register("password")} required />
                            <input placeholder="Birthday" type="date" id="birthday" {...register("birthday")} required />
                        </div>
                        <hr />
                        <div className='buttons-form-container'>
                            <button type="button" className='button-reset' onClick={clear}>Reset</button>
                            <button className='button-save'>Save</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default UsersForm