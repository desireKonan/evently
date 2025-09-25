import { useState } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
        console.log('IsOpen: ', isOpen)
    };

    const closeModal = () => {
        setIsOpen(false);
        console.log('IsOpen: ', isOpen)
    };
    
    const toggleModal = () => setIsOpen(prev => !prev);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal
    };
};