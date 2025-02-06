import React, { useState } from "react";
import "./MobileNavbar.css";

function MobileNavbar({cart, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = ({}) => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="mobile-navbar">
            <button className="menu-toggle" onClick={toggleMenu}>
                {isMenuOpen ? "✖" : "☰"}
            </button>
            {isMenuOpen && (
                <ul className="mobile-menu">
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                </ul>
            )}
        </nav>
    );
}

export default MobileNavbar;