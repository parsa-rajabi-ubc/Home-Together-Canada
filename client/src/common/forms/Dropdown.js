/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: a generic dropdown menu bar with functionality to select only 1 item or multiselect.
 * @Example1 single select: <Dropdown title={"Province"} items={provinces}/>
 * @Example2 multiselect: <Dropdown title={"Province"} items={provinces} multiSelect/>
 */

import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";



function Dropdown({title, items, name, onChange, multiSelect = false}) {
    // initialize variables
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);
    Dropdown.handleClickOutside = () => setOpen(false);
    const [dropdownTitle, setDropdownTitle] = useState(title);

    useEffect(() => {
        if (selection.length) {
            const event = {
                target: {
                    name,
                    value: selection.map(item => item.value)
                }
            }
            onChange(event);
            setDropdownTitle(event.target.value[0]);
        } else{
            setDropdownTitle(title);
        }

    }, [selection, dropdownTitle]);

    // handles onClick for each item
    function handleOnClick(item) {
        // if item has not already been selected...
        if (!selection.some(current => current.id === item.id)) {
            // if it's single select
            if (!multiSelect) {
                // select item
                setSelection([item]);
                // if it's multiselect
            } else if (multiSelect) {
                // select all items
                setSelection([...selection, item]);
            }
        } else {
            // if item has already been selected...
            let selectionAfterRemoval = selection;
            // unselected the item
            selectionAfterRemoval = selectionAfterRemoval.filter(
                current => current.id !== item.id
            );
            setSelection([...selectionAfterRemoval]);
        }
    }

    // save user's selection
    function isItemInSelection(item) {
        return selection.some(current => current.id === item.id);
    }

    return (
        // show dropdown button
        <div className="relative inline-block text-left">
            <div
                tabIndex={0}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 mx-3 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                role="button"
                // dropdown goes down/up if use is using keyboard or mouse
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}>
                    <span className="  rounded-md  bg-white ring-1 ring-black ring-opacity-25">
                    <p className=""
                       id="options-menu" aria-haspopup="true" aria-expanded="true">
                        {/*Insert dropdown "label"*/}
                        {dropdownTitle}
                        {/* If dropdown is "open", 'x' will appear, if not, a down arrow */}
                        {open ? ' ↑ ' : ' ↓ '}
                        </p>
                </span>
            </div>
            {/*If dropdown is "open"*/}
            {open && (
                <div className="">
                    <div className="origin-center absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        {items.map(item => (
                            <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" key={item.id} onClick={() => handleOnClick(item)}>
                                {item.value}
                                {isItemInSelection(item) && "✓"}

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}



Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    multiSelect: PropTypes.bool
}

export default Dropdown;