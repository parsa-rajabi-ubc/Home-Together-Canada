/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable Cohousing custom fields.
 *
 */
import PropTypes from "prop-types";
import React, {useState} from 'react';

const CohousingCustomFields = (props) =>{
    const { reset } = props;
    const title = useState(reset.title);
    const contactName = useState(reset.contactName);
    const unitsForSale = useState(reset.unitsForSale);
    const unitsForRent = useState(reset.unitsForRent);

    return(
        <div>
            <h1 className={"page-title mb-5"}> {title} </h1> <br/>
            <p>Contact Name: {contactName}</p> <br/>
            <p>Units for sale: {unitsForSale}</p> <br/>
            <p>Units for rent: {unitsForRent}</p> <br/>
            <button className={"btn btn-green mb-6 w-1/2 text-base py-2"}>Giving Rate</button>
        </div>
    );
}

CohousingCustomFields.propTypes = {
    reset: PropTypes.shape({
        title: PropTypes.string.isRequired,
        contactName: PropTypes.string.isRequired,
        unitsForSale: PropTypes.number.isRequired,
        unitsForRent: PropTypes.number.isRequired
    }).isRequired,
}

export default CohousingCustomFields;