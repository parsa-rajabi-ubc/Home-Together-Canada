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



function InterestedArea(props) {
    const {onChange} = props;
    const [extraAreas, setExtraAreas] = useState([{ province: "", city: "", radius: ""}]);

    const handleRemoveClick = index => {
        const list = [...extraAreas];
        list.splice(index, 1);
        setExtraAreas(list);
    };
    const handleAddClick = () => {
        const list = [...extraAreas];
        list.push({ province: undefined, city: undefined, radius: undefined});
        setExtraAreas(list);
    };
    const handleAreaProvinceChange = (e, index) => {
        const { value } = e;
        const list = [...extraAreas];
        list[index].province = value;
        list[index].city = undefined;
        list[index].radius = undefined;
        setExtraAreas(list);
    };
    const handleAreaCityChange = (e, index) => {
        const { value } = e;
        const list = [...extraAreas];
        list[index].city = value;
        list[index].radius = undefined;
        setExtraAreas(list);
    };
    const handleAreaRadiusChange = (e, index) => {
        const { value } = e;
        const list = [...extraAreas];
        list[index].radius = value;
        setExtraAreas(list);
    };
    useEffect(() => {
        onChange({
            extraAreas
        })
    }, [extraAreas]);
    return(
        <div>
            {extraAreas.map((x,i) =>{
                return(
                    <div key={i}>
                        <Dropdown isSearchable={true} placeholder={"Province"}
                                  name="province"
                                  options={getProvinces()}
                                  onChange={e => handleAreaProvinceChange(e, i)}/>
                                  <span>{x[i]}</span>
                        {x.province &&
                        <Dropdown isSearchable={true} placeholder={"City"}
                                  name="city"
                                  options={getCities(x.province)}
                                  onChange={e => handleAreaCityChange(e, i)}/>}
                        {x.city && <Dropdown isSearchable={true} placeholder={"Radius"}
                                                   name="radius"
                                                   options={radii}
                                                   onChange={e => handleAreaRadiusChange(e, i)}/>}
                        <div>
                            {extraAreas.length !== 1 && <Button label={""} value="Remove" onClick={()=>handleRemoveClick(i)}/> }
                            {extraAreas.length - 1 === i && <Button label={""} value="Add" onClick={()=> {handleAddClick()}}/> }
                        </div>

                    </div>
                );
            })}
        </div>
    );
}

InterestedArea.propTypes = {
    onChange: PropTypes.func
}

export default InterestedArea;