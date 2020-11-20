/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.16
 *
 * @Description: Member profile static form Component. Returns a form.
 *
 */
import React, { useState } from 'react';
import TextArea from '../common/forms/TextArea';
import RadioButton from "../common/forms/RadioButton";
import Dropdown from "../common/forms/Dropdown";
import Button from "../common/forms/Button";
import statuses from "../common/forms/Status";
import workStatuses from "../common/forms/WorkStatus";
import shareLimits from "../common/forms/ShareLimits";
import PreferredArea from "../common/forms/preferredArea";
import YNButton from "../common/forms/YNButtons";
import LargeTextArea from "../common/forms/LargeTextArea";
import provinces from "../common/forms/Provinces";
import cities from "../common/forms/Cities";
import radii from "../common/forms/Radii";

//Returns a Form with fields
function MemberProfileForm() {
    const [gender, setGender] = useState("male");
    const [birthYear, setBirthYear] = useState("");
    const [status, setStatus] = useState("");
    const [workStatus, setWorkStatus] = useState("");
    const [partners, setPartners] = useState("");
    const [shareLimit, setShareLimit] = useState("");
    const [petFriendly, setPetFriendly] = useState("no");
    const [smoking, setSmoking] = useState("no");
    const [mobilityIssues, setMobilityIssues] = useState("no");
    const [hasAllergies, setHasAllergies] = useState("no");
    const [religious, setReligious] = useState("no");
    const [hasDiet, setHasDiet] = useState("no");
    const [hasHome, setHasHome] = useState("no");
    const [maxRent, setMaxRent] = useState("1500.00");
    const [extraAreasNum, setExtraAreasNum] = useState(1)
    const [aboutSelf, setAboutSelf] = useState("");
    const [extraAreas, setExtraAreas] = useState([{ province: "", city: "", radius: ""}]);

    const handleRemoveClick = index => {
        const list = [...extraAreas];
        list.splice(index, 1);
        setExtraAreas(list);
    };
    const handleAddClick = () => {
        setExtraAreas([...extraAreas, { province: "", city: "", radius: ""}]);
    };
    function onStatusChange(e){
        const value = e.target.value;
        setStatus({
            ...status,
            [e.target.name]: value
        });
    }
    function onShareLimitChange(e){
        const value = e.target.value;
        setShareLimit({
            ...shareLimit,
            [e.target.name]: value
        });
    }
    const handleAreaChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...extraAreas];
        list[index][name] = value;
        setExtraAreas(list);
    };
    return (
        <div>
            <h1>Member Sign Up:</h1>
            <hr/>
            <form>
                <div>
                    <p>Gender</p>
                    <RadioButton label="Male: " name="gender" value="male" checked={gender==="male"} onChange={(e)=>{setGender(e.target.value)}}/>
                    <RadioButton label="Female: " name="gender" value="female" checked={gender==="female"} onChange={(e)=>{setGender(e.target.value)}}/>
                    <RadioButton label="Other: " name="gender" value="other" checked={gender==="other"} onChange={(e)=>{setGender(e.target.value)}}/>
                    <TextArea label="Preferred Pronoun: " placeholder="Pronoun" disabled={!(gender==="other")}/>
                </div>
                <TextArea label="Year of Birth: " placeholder="" onChange={(e)=>{setBirthYear(e.target.value)}} />
                <div>
                    <Dropdown name="status" title={"Status"} items={statuses} onChange={(e)=>{setStatus(e.target.value)}}/>
                    <TextArea label="Partner's username(s): " placeholder="Partner's username" disabled={!(status=="Couple")} onChange={(e)=>{setPartners(e.target.value)}}/>
                    <TextArea label="Group members: " placeholder="usernames (separated by comma)" disabled={!(status=="Existing Group")} onChange={(e)=>{setPartners(e.target.value)}}/>
                </div>
                <div>
                    <span>I am open to sharing with up to: </span>
                    <Dropdown name="shareLimit" items={shareLimits} title={"Share Limit"} onChange={(e)=>{setShareLimit(e.target.value)}}/>
                    <span> other people.</span>
                </div>
                <div>
                    <Dropdown name="workstatus" title={"Work Status"} items={workStatuses} onChange={(e)=>{setWorkStatus(e.target.value)}}/>
                    <p>Max monthly rent</p>
                    <span>$</span><input type="number" min="0.00" step="0.01" placeholder="1500.00" onChange={(e)=>{setMaxRent(e.target.value)}}/>
                </div>
                TODO: area preference dropdown with add and remove buttons
                {/*{extraAreas.map((x,i) =>{*/}
                {/*    return(*/}
                {/*        <div key={i}>*/}
                {/*            <Dropdown name="province" value={x.province} title={"Province"} items={provinces} onChange={e => handleAreaChange(e, i)}/>*/}
                {/*            <Dropdown name="city" value={x.city} title={"city"} items={cities} onChange={e => handleAreaChange(e, i)}/>*/}
                {/*            <Dropdown name="radius" value={x.radius} title={"radius"} items={radii} onChange={e => handleAreaChange(e, i)}/>*/}
                {/*            <div>*/}
                {/*                {extraAreas.length !== 1 && <Button label={""} value="Remove" onClick={()=>handleRemoveClick(i)}/> }*/}
                {/*                {extraAreas.length - 1 === i && <Button label={""} value="Add" onClick={()=>handleAddClick}/> }*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    );*/}
                {/*})}*/}
                {/*<Button label="Add another area: " value="+" onClick={(e)=>{setExtraAreasNum(extraAreasNum => extraAreasNum+1)}}/>*/}
                {/*<Button label="Remove extra area: " value="-" onClick={(e)=>{setExtraAreasNum(extraAreasNum => extraAreasNum-1)}}/>*/}
                <span>{extraAreasNum}</span>
                <YNButton label="Pet Friendly?:" name="petFriendly" checked={petFriendly==="no"} onChange={(e)=>{setPetFriendly(e.target.value)}}/>
                <YNButton label="Smoking Friendly?:" name="smoking" checked={smoking==="no"} onChange={(e)=>{setSmoking(e.target.value)}}/>
                <YNButton label="Health or Mobility Issues?:" name="mobile" checked={mobilityIssues==="no"} onChange={(e)=>{setMobilityIssues(e.target.value)}}/>
                <YNButton label="Allergies?:" name="allergies" checked={hasAllergies==="no"} onChange={(e)=>{setHasAllergies(e.target.value)}}/>
                <YNButton label="Religion is important to me?:" name="religion" checked={religious==="no"} onChange={(e)=>{setReligious(e.target.value)}}/>
                <YNButton label="The diet of others in my home is important to me?:" name="diet" checked={hasDiet==="no"} onChange={(e)=>{setHasDiet(e.target.value)}}/>
                <YNButton label="I have a home to share?:" name="hasHome" checked={hasHome==="no"} onChange={(e)=>{setHasHome(e.target.value)}}/>
                <LargeTextArea label="Tell others about yourself: " name="aboutSelf" placeholder="What is important to you, and why do you want to share a home?" onChange={(e)=>{setAboutSelf(e.target.value)}}/>
            </form>
        </div>
    );
}
export default MemberProfileForm;