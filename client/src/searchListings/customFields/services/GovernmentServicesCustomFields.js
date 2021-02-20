/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: Re-useable GovernmentServices custom fields.
 *
 */
import PropTypes from "prop-types";
import React, {useState} from 'react';

const GovernmentServicesCustomFields = (props) =>{
    const { reset } = props;
    const title = useState(reset.title);
    const contactPerson = useState(reset.contactPerson);
    const phoneNumber = useState(reset.phoneNumber);

    return(
        <div>
            <h1 className={"page-title mb-5"}> {title} </h1> <br/>
            <p>Contact Person: {contactPerson}</p> <br/>
            <p>Phone number with ability to add extension if applicable: {phoneNumber}</p> <br/>
            <button className={"btn btn-green mb-6 w-1/2 text-base py-2"}>Giving Rate</button>
        </div>
    );
}

GovernmentServicesCustomFields.propTypes = {
    reset: PropTypes.shape({
        title: PropTypes.string.isRequired,
        contactPerson: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string
    }).isRequired,
}

export default GovernmentServicesCustomFields;