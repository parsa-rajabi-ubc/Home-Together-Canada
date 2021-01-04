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

function InterestedArea(props) {
    const {onChange, styling, areasOfInterestError, areaOfInterestErrorMsg} = props;
    const [extraAreas, setExtraAreas] = useState([{province: "", city: "", radius: ""}]);

    const handleRemoveClick = index => {
        const list = [...extraAreas];
        list.splice(index, 1);
        setExtraAreas(list);
    };
    const handleAddClick = () => {
        const list = [...extraAreas];
        list.push({province: "", city: "", radius: ""});
        setExtraAreas(list);
    };
    const handleAreaProvinceChange = (e, index) => {
        const {value} = e;
        const list = [...extraAreas];
        list[index].province = value;
        list[index].city = "";
        list[index].radius = "";
        setExtraAreas(list);
    };
    const handleAreaCityChange = (e, index) => {
        const {value} = e;
        const list = [...extraAreas];
        list[index].city = value;
        list[index].radius = "";
        setExtraAreas(list);
    };
    const handleAreaRadiusChange = (e, index) => {
        const {value} = e;
        const list = [...extraAreas];
        list[index].radius = value;
        setExtraAreas(list);
    };
    const error = [];
    useEffect(() => {
        onChange(
            extraAreas
        )
        validator();
    }, [extraAreas]);

    const validator = () => {
        for (let i = 0; i <= extraAreas.length - 1; i++) {
            if (extraAreas[i].province === undefined) {
                console.log("prov at index", i)
                error.push(i);
            } else if (extraAreas[i].city === undefined) {
                console.log("city at index", i)
                error.push(i);
            } else if (extraAreas[i].radius === undefined) {
                console.log("radius at index", i)
                error.push(i);
            }
        }
    }
        console.log("error is OUTSIDE", error);
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
                                      styling={styling}
                            />
                            <span>{currentAreaValues[index]}</span>
                        </div>
                        <div className="col-start-4 col-end-8">
                            {currentAreaValues.province &&
                            <Dropdown isSearchable={true} placeholder={"City"}
                                      name="city"
                                      options={getCities(currentAreaValues.province)}
                                      onChange={e => handleAreaCityChange(e, index)}
                                      styling={styling}
                            />}
                        </div>
                        <div className="col-start-8 col-end-10">
                            {currentAreaValues.city && <Dropdown isSearchable={true} placeholder={"Within Radius"}
                                                                 name="radius"
                                                                 options={radii}
                                                                 onChange={e => handleAreaRadiusChange(e, index)}
                                                                 styling={styling}
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
            <div className="col-start-1 col-end-6">
                {areaOfInterestErrorMsg && <label className={"error-msg"}>{areaOfInterestErrorMsg}</label>}
            </div>
        </div>

    );
}

InterestedArea.propTypes = {
    onChange: PropTypes.func,
    areasOfInterestError: PropTypes.bool,
    styling: PropTypes.object,
    areaOfInterestErrorMsg: PropTypes.string
}

export default InterestedArea;