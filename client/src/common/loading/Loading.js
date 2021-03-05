/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.20
 *
 * @Description: Loading Component
 *
 */

import React from "react";
import PropTypes from "prop-types";
import SyncLoader from "react-spinners/SyncLoader";

const LOADING_MSG = "Loading...";
const LOADING_COLOR = "#EC8937";

function Loading(props) {
    const {isLoading} = props;

    return (
        <section className={"text-center min-h-screen transform translate-y-1/2"}>
            <h1 className={"text-gray-800 h1"}>{LOADING_MSG}</h1>
            <SyncLoader loading={isLoading} color={LOADING_COLOR}/>
        </section>
    );
}

Loading.propTypes = {
    isLoading: PropTypes.bool.isRequired
}


export default Loading;