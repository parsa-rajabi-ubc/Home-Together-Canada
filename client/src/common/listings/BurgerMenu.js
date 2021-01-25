/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.25
 *
 * @Description: Reusable Menu component
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import Menu from 'react-burger-menu/lib/menus/slide';


const BurgerMenu = (props) => {
    const {isOpen, onClose, content} = props;

    return (
        //https://github.com/negomi/react-burger-menu
        <Menu
            width={"30%"}
            disableAutoFocus
            itemListElement="div"
            customBurgerIcon={false}
            customCrossIcon={false}
            isOpen={isOpen} onClose={onClose}
            menuClassName={"bg-gray-700 p-5 rounded-xl"}
            itemListClassName={"p-2 bg-gray-700"}
        >
            {content}
        </Menu>
    )
}

BurgerMenu.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    content: PropTypes.any
};

export default BurgerMenu;