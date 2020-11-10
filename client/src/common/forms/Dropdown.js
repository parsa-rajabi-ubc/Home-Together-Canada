/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: a generic dropdown menu bar with functionality to select only 1 item or multiselect.
 * @Example1 single select: <Dropdown title={"Province"} items={provinces}/>
 * @Example2 multiselect: <Dropdown title={"Province"} items={provinces} multiSelect/>
 */

import React, {useState} from 'react';
import PropTypes from "prop-types";
// TODO: uncomment line below and install react-onclickoutsite to enable feature of onClickOutside function
// import onClickOutside from 'react-onclickoutside';


function Dropdown({title, items, multiSelect = false}) {
    // initilize variables
    const [open, setOpen] = useState(false);
    const [selection, setSelection] = useState([]);
    const toggle = () => setOpen(!open);
    Dropdown.handleClickOutside = () => setOpen(false);

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
                className=""
                role="button"
                // dropdown goes down/up if use is using keyboard or mouse
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}>
                    <span className="">
                    <p className=""
                       id="options-menu" aria-haspopup="true" aria-expanded="true">
                        {/*Insert dropdown "label"*/}
                        {title}
                        {/* If dropdown is "open", 'x' will appear, if not, a down arrow */}
                        {open ? ' x ' : ' ↓ '}
                        </p>
                </span>
            </div>
            {/*If dropdown is "open"*/}
            {open && (
                <div className="">
                    <div className="">
                        {items.map(item => (
                            <div className="" key={item.id} type="button" onClick={() => handleOnClick(item)}>
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

//TODO: this function requires react-onclickoutside to be installed, for this to happen we need to downgrade to react 16.X
const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside,
};


Dropdown.propTypes = {
    title: PropTypes.string,
    items: PropTypes.string,
    multiSelect: PropTypes.bool
}

// export default onClickOutside(Dropdown, clickOutsideConfig);
export default Dropdown;
