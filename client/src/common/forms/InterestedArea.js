import React, {useState} from 'react';
import Select from 'react-select';
import PropTypes from "prop-types";
import radii from "./Radii";
import 'canada'


const canada = require('canada');


function getProvinces(){
    // get object mapping abbreviations to full names
    const provinces = canada.provinces
    // get abbreviations
    const abbreviations = Object.keys(provinces)
    // create array of provinces (key, value)
    const provinces_list = [];
    for (let key in abbreviations ){
        provinces_list.push({
            //Example: "AB" : "AB"
            label: abbreviations[key],
            value: abbreviations[key]
        })
    }
    return provinces_list;
}

function getCities(prov){
    // create array of cities (key, value)
    const city_list = []
    canada.cities.map(function (cityData) {
        // look for cities that are in the province that was passed into the method (prov)
        if (prov === cityData[1]) {
            city_list.push({
                // Example: "Calgary" : "Calgary"
                label: cityData[0],
                value: cityData[0]
            })
        }
    })
    return city_list;
}

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
            <Select isSearchable={true} placeholder={"Province"}
                    options={getProvinces()} value={getProvinces().find(obj => obj.value === selectedProvince)}
                    onChange={handleProvinceChange}/>
            <div><b>Selected : </b> {selectedProvince}</div>

            {selectedProvince &&
            <Select isSearchable={true} placeholder={"City"}
                    options={getCities(selectedProvince)} value={getCities().find(obj => obj.value === selectedCity)}
                    onChange={handleCityChange}/>}
            {selectedCity && <div><b>Selected city: </b> {selectedCity}</div>}

            {selectedCity && <Select isSearchable={true} placeholder={"Radius"}
                                     options={radii} value={radii.find(obj => obj.value === selectedRadius)}
                                     onChange={handleRadiusChange}/>}
            {selectedRadius && <div><b>Selected radius: </b> {selectedRadius}</div>}

        </div>
    )

}

export default InterestedArea;