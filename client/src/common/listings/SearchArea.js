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
import {dropdownErrorCSS, dropdownSearchAreaCSS} from "../../css/dropdownCSSUtil"


function SearchArea(props) {
    const {
        onChange, searchArea,
        SearchAreaProvinceError,
        SearchAreaCityError,
        SearchAreaRadiusError,
    } = props;
    const [selectedProvince, setSelectedProvince] = useState(
        (!!searchArea && !!searchArea.province)
            ? {label: searchArea.province, value: searchArea.province}
            : null
    );
    const [selectedCity, setSelectedCity] = useState(
        (!!searchArea && !!searchArea.city)
            ? {label: searchArea.city, value: searchArea.city}
            : null
    );
    const [selectedRadius, setSelectedRadius] = useState(
        (!!searchArea && !!searchArea.radius)
            ? {label: `${searchArea.radius} km`, value: searchArea.radius}
            : null
    );
    const [cityOptions, setCityOptions] = useState(selectedProvince ? getCities(selectedProvince.value) : []);

    const handleProvinceChange = e => {
        setSelectedProvince({label: e.value, value: e.value});
    }
    const handleCityChange = e => {
        setSelectedCity({label: e.value, value: e.value});
    }
    const handleRadiusChange = e => {
        setSelectedRadius({label: e.value, value: e.value});
    }

    useEffect(() => {
        !!selectedProvince && setCityOptions(getCities(selectedProvince.value));
        // this will clear the city name when the province changes, except when province is initially set
        if (!!selectedProvince && selectedProvince.value !== searchArea.province) {
            setSelectedCity(null);
        }
    }, [selectedProvince]);

    useEffect(() => {
        onChange({
            province: selectedProvince ? selectedProvince.value : selectedProvince,
            city: selectedCity ? selectedCity.value : selectedCity,
            radius: selectedRadius ? selectedRadius.value : selectedRadius
        })
    }, [selectedProvince, selectedCity, selectedRadius]);

    return (
        <div>
            <div className="grid grid-cols-10 gap-x-2">
                <div className="col-start-1 col-end-4">
                    <Dropdown isSearchable={true} placeholder={"Province"}
                              name="province"
                              options={getProvinces()}
                              onChange={e => handleProvinceChange(e)}
                              dropdownCSS={SearchAreaProvinceError ? dropdownErrorCSS : dropdownSearchAreaCSS}
                              initialSelection={selectedProvince}
                    />
                </div>
                <div className="col-start-4 col-end-8" key={selectedCity}>
                    <Dropdown isSearchable={true} placeholder={"City"}
                              name="city"
                              options={cityOptions}
                              onChange={e => handleCityChange(e)}
                              dropdownCSS={SearchAreaCityError ? dropdownErrorCSS : dropdownSearchAreaCSS}
                              initialSelection={selectedCity}
                    />
                </div>
                <div className="col-start-8 col-end-11">
                    <Dropdown
                        isSearchable={true}
                        placeholder={"Radius"}
                        name="radius"
                        options={radii}
                        onChange={e => handleRadiusChange(e)}
                        dropdownCSS={SearchAreaRadiusError ? dropdownErrorCSS : dropdownSearchAreaCSS}
                        initialSelection={selectedRadius}
                    />
                </div>

            </div>
        </div>

    );
}

SearchArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    searchArea: PropTypes.shape({
        province: PropTypes.string,
        city: PropTypes.string,
        radius: PropTypes.number
    }),
    SearchAreaProvinceError: PropTypes.bool,
    SearchAreaCityError: PropTypes.bool,
    SearchAreaRadiusError: PropTypes.bool
}

export default SearchArea;
