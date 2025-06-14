import React, { useState, useRef, useEffect } from 'react';


const MultipleSelector = ({ setSelectedItems, selectedItems, itemsArray }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        setSelectedItems(prevSelectedItems => {
            if (prevSelectedItems.includes(value)) {
                return prevSelectedItems.filter(item => item !== value);
            } else {
                return [...prevSelectedItems, value];
            }
        });
    };

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <div className="dropdown-button" onClick={handleDropdownToggle}>
                {isOpen ? 'Exit' : 'Unit'}
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {itemsArray && itemsArray.length > 0 && itemsArray.map((type) => (
                        <div key={type.value} className="dropdown-item">
                            <input
                                type="checkbox"
                                value={type?.value ?? ""}
                                checked={selectedItems.includes(type?.value)}
                                onChange={handleCheckboxChange}
                            />
                            <p>{type?.label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultipleSelector;
