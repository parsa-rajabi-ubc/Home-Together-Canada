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
import statuses from "../common/forms/Status";
import workStatuses from "../common/forms/WorkStatus";
import shareLimits from "../common/forms/ShareLimits";
import YNButton from "../common/forms/YNButtons";
import LargeTextArea from "../common/forms/LargeTextArea";
import radii from "../common/forms/Radii";
import PropTypes from 'prop-types';
import SubmitButton from "../common/forms/SubmitButton";

//Returns a Form with fields
function MemberProfileForm(props) {

    const {values} = props;
    const [hasCheckedForExistingValues, setHasCheckedForExistingValues] = useState(false);
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [workStatus, setWorkStatus] = useState("");
    const [partners, setPartners] = useState("");
    const [shareLimit, setShareLimit] = useState("");
    const [petFriendly, setPetFriendly] = useState("");
    const [smoking, setSmoking] = useState("");
    const [mobilityIssues, setMobilityIssues] = useState("");
    const [hasAllergies, setHasAllergies] = useState("");
    const [religious, setReligious] = useState("");
    const [hasDiet, setHasDiet] = useState("");
    const [hasHome, setHasHome] = useState("");
    const [minRent, setMinRent] = useState("500.00");
    const [maxRent, setMaxRent] = useState("1500.00");
    const [aboutSelf, setAboutSelf] = useState("");
    const [extraAreas, setExtraAreas] = useState([{ province: "ALBERTA", city: "", radius: ""}]);
    // Adjusted this way for member account summary to prevent re-renders and avoid "usestate in conditionals" problems
    if (!hasCheckedForExistingValues) {
        if (typeof values != "undefined" && gender !== values.gender) {
            setGender(values.gender);
        }
        if (typeof values != "undefined" && status !== values.status) {
            setStatus(values.status);
        }
        if (typeof values != "undefined" && partners !== values.partners) {
            setPartners(values.partners);
        }
        if (typeof values != "undefined" && shareLimit !== values.shareLimit) {
            setShareLimit(values.shareLimit);
        }
        if (typeof values != "undefined" && workStatus !== values.workStatus) {
            setWorkStatus(values.workStatus);
        }
        if (typeof values != "undefined" && petFriendly !== values.petFriendly) {
            setPetFriendly(values.petFriendly);
        }
        if (typeof values != "undefined" && smoking !== values.smoking) {
            setSmoking(values.smoking);
        }
        if (typeof values != "undefined" && mobilityIssues !== values.mobilityIssues) {
            setMobilityIssues(values.mobilityIssues);
        }
        if (typeof values != "undefined" && hasAllergies !== values.hasAllergies) {
            setHasAllergies(values.hasAllergies);
        }
        if (typeof values != "undefined" && religious !== values.religious) {
            setReligious(values.religious);
        }
        if (typeof values != "undefined" && hasDiet !== values.hasDiet) {
            setHasDiet(values.hasDiet);
        }
        if (typeof values != "undefined" && hasHome !== values.hasHome) {
            setHasHome(values.hasHome);
        }
        if (typeof values != "undefined" && minRent !== values.minRent) {
            setMinRent(values.minRent);
        }
        if (typeof values != "undefined" && maxRent !== values.maxRent) {
            setMaxRent(values.maxRent);
        }
        if (typeof values != "undefined" && aboutSelf !== values.aboutSelf) {
            setAboutSelf(values.aboutSelf);
        }
        setHasCheckedForExistingValues(true);
    }
    const handleRemoveClick = index => {
        const list = [...extraAreas];
        list.splice(index, 1);
        setExtraAreas(list);
    };
    const handleAddClick = () => {
        setExtraAreas([...extraAreas, { province: "ALBERTA", city: "", radius: ""}]);
    };
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
                    <TextArea label="Elaborate: " placeholder="Optional" disabled={!(gender==="other")}/><span>Gender currently saved as: {gender}</span>
                </div>
                <div>
                    {/*<Dropdown name="status" title={"Status"} items={statuses} onChange={(e)=>{setStatus(e.target.value)}}/><span>{status}</span>*/}<span>Status currently saved as: {status}</span>
                    <TextArea label="Partner's username(s): " placeholder="Partner's username" disabled={!(status=="Couple")} onChange={(e)=>{setPartners(e.target.value)}}/>
                    <TextArea label="Group members: " placeholder="usernames (separated by comma)" disabled={!(status=="Existing Group")} onChange={(e)=>{setPartners(e.target.value)}}/><span>Partners currently saved as: {partners}</span>
                </div>
                <div>
                    <span>I am open to sharing with up to: </span>
                    {/*<Dropdown name="shareLimit" items={shareLimits} title={"Share Limit"} onChange={(e)=>{setShareLimit(e.target.value)}}/><span>{shareLimit}</span>*/}<span>Share limit currently saved as: {shareLimit}</span>
                    <span> other people.</span>
                </div>
                <div>
                    {/*<Dropdown name="workstatus" title={"Work Status"} items={workStatuses} onChange={(e)=>{setWorkStatus(e.target.value)}}/><span>{workStatus}</span>*/}<span>Work status currently saved as: {workStatus}</span>
                    <p>Max monthly rent</p>
                    <span>$</span><input type="number" min="0.00" step="0.01" placeholder="500.00" value={minRent} onChange={(e)=>{setMinRent(e.target.value)}}/><span>Minimum rent currently saved as: {minRent}</span>
                    <span>$</span><input type="number" min="0.00" step="0.01" placeholder="1500.00" value={maxRent} onChange={(e)=>{setMaxRent(e.target.value)}}/><span>Maximum rent currently saved as: {maxRent}</span>
                </div>
                {/*{extraAreas.map((x,i) =>{*/}
                {/*    return(*/}
                {/*        <div key={i}>*/}
                {/*            <Dropdown name="province" value={x.province.value} title={"Province"} items={provinces} onChange={e => handleAreaChange(e, i)}/><span>{x.province}</span>*/}
                {/*            <Dropdown name="city" value={x.city.value} title={"city"} items={cities[cities.map(function(e) { return e.name; }).indexOf(x.province)].citylist} onChange={e => handleAreaChange(e, i)}/><span>{x.city}</span>*/}
                {/*            <Dropdown name="radius" value={x.radius.value} title={"radius"} items={radii} onChange={e => handleAreaChange(e, i)}/><span>{x.radius}</span>*/}
                {/*            <div>*/}
                {/*                {extraAreas.length !== 1 && <Button label={""} value="Remove" onClick={()=>handleRemoveClick(i)}/> }*/}
                {/*                {extraAreas.length - 1 === i && <Button label={""} value="Add" onClick={handleAddClick}/> }*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    );*/}
                {/*})}*/}
                <YNButton label="Pet Friendly?:" name="petFriendly" checked={petFriendly==="no"} onChange={(e)=>{setPetFriendly(e.target.value)}}/><span>Pet friendly currently saved as: {petFriendly}</span>
                <YNButton label="Smoking Friendly?:" name="smoking" checked={smoking==="no"} onChange={(e)=>{setSmoking(e.target.value)}}/><span>Smoking friendly status currently saved as: {smoking}</span>
                <YNButton label="Health or Mobility Issues?:" name="mobile" checked={mobilityIssues==="no"} onChange={(e)=>{setMobilityIssues(e.target.value)}}/><span>Mobility issues currently saved as: {mobilityIssues}</span>
                <YNButton label="Allergies?:" name="allergies" checked={hasAllergies==="no"} onChange={(e)=>{setHasAllergies(e.target.value)}}/><span>Allergy status currently saved as: {hasAllergies}</span>
                <YNButton label="Religion is important to me?:" name="religion" checked={religious==="no"} onChange={(e)=>{setReligious(e.target.value)}}/><span>Religious status currently saved as: {religious}</span>
                <YNButton label="The diet of others in my home is important to me?:" name="diet" checked={hasDiet==="no"} onChange={(e)=>{setHasDiet(e.target.value)}}/><span>Diet status currently saved as: {hasDiet}</span>
                <YNButton label="I have a home to share?:" name="hasHome" checked={hasHome==="no"} onChange={(e)=>{setHasHome(e.target.value)}}/><span>Home status currently saved as: {hasHome}</span>
                <LargeTextArea label="Tell others about yourself: " name="aboutSelf" placeholder="What is important to you, and why do you want to share a home?" onChange={(e)=>{setAboutSelf(e.target.value)}}/><span>Self description currently saved as: {aboutSelf}</span>
                <SubmitButton value = 'Next' onClick={() => null}/>
            </form>
        </div>
    );
}
MemberProfileForm.propTypes = {
    values: PropTypes.object
}
export default MemberProfileForm;