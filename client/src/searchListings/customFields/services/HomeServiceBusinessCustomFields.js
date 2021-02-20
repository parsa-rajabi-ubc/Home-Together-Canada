/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable HomeServiceBusiness custom fields.
 *
 */
import PropTypes from "prop-types";
import React, {useState} from 'react';
import HTC_Logo from "../../../images/HTC_Logo.jpg";

const HomeServiceBusinessCustomFields = (props) =>{
    const { reset } = props;
    const title = useState(reset.title);
    const rateAndFees = useState(reset.rateAndFees);
    const pictures = useState(reset.pictures);

    return(
        <div>
            <h1 className={"page-title mb-5"}> {title} </h1> <br/>
            <p>Rates and fees: {rateAndFees} ($CAD)</p> <br/>
            <p>Pictures (max of 6): </p> <br/>
            {/*TODO: replace HTC_Logo with pictures Pictures (max of 6)*/}
            <img className={"float-left w-24 h-auto mx-4 "} src={HTC_Logo} alt={""}/> <br/>
            <button className={"btn btn-green mb-6 w-1/2 text-base py-2"}>Giving Rate</button>
        </div>
    );
}

HomeServiceBusinessCustomFields.propTypes = {
    reset: PropTypes.shape({
        title: PropTypes.string.isRequired,
        rateAndFees: PropTypes.number.isRequired,
        pictures: PropTypes.string.isRequired
    }).isRequired,
}

export default HomeServiceBusinessCustomFields;