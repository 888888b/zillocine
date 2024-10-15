'use client';

import React, { MutableRefObject, useEffect, useRef, useContext } from "react";

import { GlobalEventsContext } from "@/components/contexts/globalEventsContext";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import RegisterForm from "./form";

export default function RegisterModal() {

    const checkboxInputRef: MutableRefObject<(HTMLInputElement | null)> = useRef( null );
    const globalEvents = useContext( GlobalEventsContext );

    const checkboxToggle = () => {
        checkboxInputRef.current?.click();
    };

    useEffect(() => {
        if ( globalEvents.isRegisterModalActive ) {
            checkboxToggle();
        }
    },[ globalEvents.isRegisterModalActive ]);

    const closeRegisterModal = () => {
        globalEvents.setModalsController( prev  => ({
            ...prev,
            isRegisterModalActive: !prev.isRegisterModalActive
        }));

        checkboxToggle();
    };

    return (
        <>
            <input type="checkbox" ref={checkboxInputRef} id="my_modal_6" className="modal-toggle" />
            <div className="modal h-lvh overflow-y-scroll w-screen overflow-x-hidden" role="dialog">
                <div className="z-50 bg-darkpurple rounded font-poppins px-4 my-10 py-5 w-[calc(100%-32px)] max-w-[420px] relative">
                   <h3 className="text-2xl font-semibold">Registre-se</h3>
                   
                   <button className="w-full h-12 rounded mt-7 bg-white text-black text-sm font-semibold px-3 flex items-center gap-x-2 border-none outline-none btn hover:bg-white justify-start">
                    <FcGoogle className="text-3xl"/>
                    continuar com o google
                   </button>

                   <button className="w-full h-12 rounded mt-4 bg-deepnight text-white text-sm font-semibold px-3 flex items-center gap-x-2 border-none justify-start outline-none btn hover:bg-deepnight">
                    <FaGithub className="text-3xl"/>
                    continuar com o github
                   </button>

                   <div className="my-6 w-full roude relative before:w-full before:h-0.5 before:rounded-xl before:bg-darkslateblue before:absolute flex items-center justify-center before:-z-10">
                        <p className="px-3 bg-darkpurple text-sm">Ou</p>
                   </div>

                   <RegisterForm/>

                    <button onClick={() => closeRegisterModal()} className="modal-actio bg-darkslateblue w-10 h-10 rounded-full flex items-center justify-center absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 cursor-pointer">
                        <IoClose className='text-xl'/>
                    </button>
                </div>

                <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} className="w-screen min-h-screen fixed top-0 left-0"></div>
            </div>
        </>
    );
};