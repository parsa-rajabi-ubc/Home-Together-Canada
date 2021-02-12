/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.11
 *
 * @Description: Search Area component
 *
 */

import React, {useState, useEffect} from 'react';
import radii from "../forms/Radii";
import {getProvinces, getCities} from "../utils/locationUtils";
import Dropdown from "../forms/Dropdown";
import PropTypes from "prop-types";
import {dropdownSearchAreaCSS} from "../../css/dropdownCSSUtil"


function SearchArea(props) {
    const {onChange} = props;
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedRadius, setSelectedRadius] = useState();

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
            <div className="grid grid-cols-10 gap-x-2">
                <div className="col-start-1 col-end-4">
                    <Dropdown isSearchable={true} placeholder={"Province"}
                              name="province"
                              options={getProvinces()}
                              onChange={e => handleProvinceChange(e)}
                              dropdownCSS={dropdownSearchAreaCSS}
                    />
                </div>
                <div className="col-start-4 col-end-8">
                    <Dropdown isSearchable={true} placeholder={"City"}
                              name="city"
                              options={getCities(selectedProvince)}
                              onChange={e => handleCityChange(e)}
                              dropdownCSS={dropdownSearchAreaCSS}
                    />
                </div>
                <div className="col-start-8 col-end-11">
                    <Dropdown
                        isSearchable={true}
                        placeholder={"Radius"}
                        name="radius"
                        options={radii}
                        onChange={e => handleRadiusChange(e)}
                        dropdownCSS={dropdownSearchAreaCSS}
                    />
                </div>

            </div>
        </div>

    );
}

SearchArea.propTypes = {
    onChange: PropTypes.func.isRequired,
}

export default SearchArea;