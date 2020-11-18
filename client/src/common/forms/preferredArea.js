/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.16
 *
 * @Description: Member interested area form Component. Returns a set of 3 dropdowns.
 *
 */
import Dropdown from "./Dropdown";
import provinces from "./Provinces";
import cities from "./Cities";
import radii from "./Radii";
import React from "react";
function PreferredArea(){
    return(
        <div>
            <p>Areas I am interested in living</p>
            <Dropdown name="province" title={"Province"} items={provinces} onChange={onchange}/>
            <Dropdown name="city/town" title={"city/town"} items={cities} onChange={onchange}/>
            <Dropdown name="radius" title={"radius"} items={radii} onChange={onchange}/>
        </div>
    );
}
export default PreferredArea();
