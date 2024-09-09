import './top_button.css'

import React, {useEffect} from "react";


const ScrollToTopButton: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const handleScroll = () => {
        const toTop = document.querySelector(".scroll-to-top-button") as HTMLButtonElement
        if (window.scrollY > 50) {
            toTop.classList.add("active")
            return
        }
        toTop.classList.remove("active")
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <button className={"scroll-to-top-button"} onClick={scrollToTop}>
            <i className="bi bi-arrow-up-short"></i>
        </button>
    );
};

export default ScrollToTopButton;