/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Interested Are component for Member Profile
 *
 */

import React, {useState, useEffect} from 'react';
import radii from "./Radii";
import {getProvinces, getCities} from "../utils/locationUtils";
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";



function InterestedArea(props) {
    const {onChange} = props;
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedRadius, setSelectedRadius] = useState(null);

    const handleProvinceChange = e => {
        setSelectedProvince(e.value);
    }
    const handleCityChange = e => {
        setSelectedCity(e.value);
    }
    const handleRadiusChange = e => {
        setSelectedRadius(e.value);
    }

    useEffect(() => {
        onChange({
            province: selectedProvince,
            city: selectedCity,
            radius: selectedRadius
        })
    }, [selectedProvince, selectedCity, selectedRadius])

    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Province"}
                    options={getProvinces()}
                    onChange={handleProvinceChange}/>
            {selectedProvince &&
            <Dropdown isSearchable={true} placeholder={"City"}
                    options={getCities(selectedProvince)}
                    onChange={handleCityChange}/>}

            {selectedCity && <Dropdown isSearchable={true} placeholder={"Radius"}
                                     options={radii}
                                     onChange={handleRadiusChange}/>}

        </div>
    )

}

InterestedArea.propTypes = {
    onChange: PropTypes.func
}

export default InterestedArea;