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
    const {isOpen, onClose, content, disableExistOnClickAway} = props;

    const styles = {
        bmOverlay: {
            background: 'transparent'
        }
    };

    return (
        //https://github.com/negomi/react-burger-menu
        <Menu
            styles={ styles }
            // disableOverlayClick = {disableExistOnClickAway}
            width={"30%"}
            disableAutoFocus
            itemListElement="div"
            customBurgerIcon={false}
            customCrossIcon={false}
            isOpen={isOpen} onClose={onClose}
            menuClassName={"rounded-xl"}
            itemListClassName={"bg-gray-700 overflow-auto"}
        >
            {content}
        </Menu>
    )
}

BurgerMenu.propTypes = {
    isOpen: PropTypes.bool,
    disableExistOnClickAway: PropTypes.bool,
    onClose: PropTypes.func,
    content: PropTypes.element
};

export default BurgerMenu;