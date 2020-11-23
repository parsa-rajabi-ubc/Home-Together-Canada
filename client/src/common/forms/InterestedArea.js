/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Interested Are component for Member Profile
 *
 */

import React, {useState} from 'react';
import radii from "./Radii";
import {getProvinces, getCities} from "../utils/locationUtils";
import Dropdown from "./Dropdown";


function InterestedArea() {
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

export default InterestedArea;