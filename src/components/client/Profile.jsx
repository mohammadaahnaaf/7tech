import { Layout } from '@seventech/layout';
import React, { Fragment } from 'react'
import axiosAPI from "../utils/axios-api";
import { SuccessText } from '..';
import { Dialog, Transition } from '@headlessui/react';
import { Router } from 'next/router';

export function Setting() {

    const [success, setSuccess] = React.useState()
    let [isOpen, setIsOpen] = React.useState(false)
    const [me, setMe] = React.useState({
        _id: '',
        isAdmin: null,
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        zone: ""
    })

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    // get me
    React.useEffect(() => {
        async function getProfile() {
            try {
                const res = await axiosAPI.get('/auth/get-me');
                setMe(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getProfile()
    }, [success]);

    //submit edit data
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const reqData = {
                isAdmin: true,
                fullName: "string",
                email: "string",
                phoneNumber: "string",
                address: "string",
                city: "string",
                zone: "string"
            }
            await axiosAPI.put(`/user/${me._id}`, me)
            setSuccess('Profile Edited')
            setTimeout(() => { setSuccess('') }, 2000)
        } catch (error) {
            console.log(error)
        }
    }


    // edit profile 
    function handleChange(event) {
        const { name, value } = event.target;
        setMe((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    async function handleDelete() {
        await axiosAPI.delete(`/user/${me._id}`)
        setIsOpen(false)
        Router.push('/')
    }

    const sureDelete = (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Delete Profile
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete your profile? Remember! There is no return if you have deleted once.
                                    </p>
                                </div>

                                <div className="flex items-center justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-black hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

    return (
        <div className="py-6 sm:px-6 lg:px-8">
            <SuccessText success={success} />
            <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg md:grid md:grid-cols-1 md:gap-6">
                {sureDelete}
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="shadow overflow-hidden rounded-b-lg">
                        <div className="px-4 py-5 sm:p-6 border-b border-black">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 mx-auto rounded-full justify-center block">
                                    <label className="block text-md font-medium text-center text-black" />
                                    <div className="mt-1 grid gap-2 justify-items-center items-center">
                                        <div className="inline-block ring-2 ring-black h-24 w-24 overflow-hidden">

                                            <button
                                                disabled
                                                type="button">
                                                <svg className="h-full cursor-not-allowed w-full text-black" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </button>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="fullName" className="block text-sm font-medium text-black">
                                        Your name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        id="fullName"
                                        value={me.fullName || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="mt-1 focus:ring-black bg-white text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-black">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={me.email || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="mt-1 bg-white focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">
                                        Phone number
                                    </label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={me.phoneNumber || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="mt-1 bg-white focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                    <label htmlFor="city" className="block text-sm font-medium text-black">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        value={me.city || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="mt-1 bg-white focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                    <label htmlFor="zone" className="block text-sm font-medium text-black">
                                        Zone
                                    </label>
                                    <input
                                        type="text"
                                        name="zone"
                                        id="zone"
                                        value={me.zone || ''}
                                        onChange={(event) => handleChange(event)}
                                        className="mt-1 bg-white focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="about" className="block text-sm font-medium text-black">
                                        Address
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="address"
                                            name="address"
                                            rows={4}
                                            placeholder="Write details of your address"
                                            value={me.address || ''}
                                            onChange={(event) => handleChange(event)}
                                            className="mt-1 bg-white placeholder-gray-400 focus:ring-black text-black ring-white border-white focus:border-black block w-full shadow-sm sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex gap-4 justify-end items-center rounded-b-lg text-right">
                            <button
                                type="button"
                                onClick={openModal}
                                className="inline-flex bg-red-600 justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium text-white hover:bg-white hover:text-red-600 hover:ring-red-600 focus:outline-none ring-2 ring-red-600"
                            >
                                Delete Profile
                            </button>
                            <button
                                type="submit"
                                className="inline-flex bg-black justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium hover:text-black text-white hover:bg-white ring-black focus:outline-none ring-2 hover:ring-black"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export function Profile() {
    return (
        <Layout>
            <Setting />
        </Layout>
    )
}

// This App is made by Ahnaf and Tanvir 