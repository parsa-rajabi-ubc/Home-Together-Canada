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
import Button from "./Button";
import {MdDeleteForever} from 'react-icons/md';
import {dropdownDefaultCSS} from "../../css/dropdownCSSUtil"


function InterestedArea(props) {
    const {onChange, givenAreasOfInterest, areasOfInterestError} = props;
    const [extraAreas, setExtraAreas] = useState(givenAreasOfInterest || [{province: "", city: "", radius: ""}]);

    const handleRemoveClick = index => {
        const list = [...extraAreas];
        list.splice(index, 1);
        setExtraAreas(list);
    };
    const handleAddClick = () => {
        const list = [...extraAreas];
        list.push({province: undefined, city: undefined, radius: undefined});
        setExtraAreas(list);
    };
    const handleAreaProvinceChange = (e, index) => {
        const {value} = e;
        const list = [...extraAreas];
        list[index].province = value;
        list[index].city = undefined;
        list[index].radius = undefined;
        setExtraAreas(list);
    };
    const handleAreaCityChange = (e, index) => {
        const {value} = e;
        const list = [...extraAreas];
        list[index].city = value;
        list[index].radius = undefined;
        setExtraAreas(list);
    };
    const handleAreaRadiusChange = (e, index) => {
        const {value} = e;
        const list = [...extraAreas];
        list[index].radius = value;
        setExtraAreas(list);
    };
    useEffect(() => {
        onChange(
            extraAreas
        )
    }, [extraAreas]);

    return (
        <div>
            <section className={`${areasOfInterestError && "border rounded-lg p-1 border-red-500"}`}>
                {extraAreas.map((currentAreaValues, index) => {
                    return (
                        <div key={index} className="grid grid-cols-9 gap-x-2">
                            <div className="col-start-1 col-end-4">
                                <Dropdown isSearchable={true} placeholder={"Province"}
                                          name="province"
                                          options={getProvinces()}
                                          onChange={e => handleAreaProvinceChange(e, index)}
                                          intialSelection={{label: extraAreas[index].province, value: extraAreas[index].province}}
                                          dropdownCSS={dropdownDefaultCSS}
                                />
                                <span>{currentAreaValues[index]}</span>
                            </div>
                            <div className="col-start-4 col-end-8">
                                {currentAreaValues.province &&
                                <Dropdown isSearchable={true} placeholder={"City"}
                                          name="city"
                                          options={getCities(currentAreaValues.province)}
                                          onChange={e => handleAreaCityChange(e, index)}
                                          intialSelection={{label: extraAreas[index].city, value: extraAreas[index].city}}
                                          dropdownCSS={dropdownDefaultCSS}
                                />}
                            </div>
                            <div className="col-start-8 col-end-10">
                                {currentAreaValues.city && <Dropdown isSearchable={true} placeholder={"Within Radius"}
                                                                     name="radius"
                                                                     options={radii}
                                                                     onChange={e => handleAreaRadiusChange(e, index)}
                                                                     intialSelection={{label: extraAreas[index].radius, value: extraAreas[index].radius}}
                                                                     dropdownCSS={dropdownDefaultCSS}
                                />}
                            </div>
                            <div className="col-start-10 col-end-auto">
                                {extraAreas.length !== 1 &&
                                <MdDeleteForever color="#DB4437" size="40" onClick={() => handleRemoveClick(index)}/>}
                            </div>
                            <div className="col-start-1 col-end-4">
                                {extraAreas.length - 1 === index &&
                                <Button className="btn btn-green text-sm py-2 " value="Add Another Location"
                                        onClick={() => {
                                            handleAddClick()
                                        }}/>}
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>

    );
}

InterestedArea.propTypes = {
    onChange: PropTypes.func,
    givenAreasOfInterest: PropTypes.array,
    areasOfInterestError: PropTypes.bool,
}

export default InterestedArea;