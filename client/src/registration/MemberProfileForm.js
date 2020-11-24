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
import YNButton from "../common/forms/YNButtons";
import LargeTextArea from "../common/forms/LargeTextArea";
import InterestedArea from "../common/forms/InterestedArea";
import Status from "../common/forms/Status";
import ShareLimit from "../common/forms/ShareLimits";

//Returns a Form with fields
function MemberProfileForm() {
    const [gender, setGender] = useState("");
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
                    {(gender === "other") &&<TextArea label="Elaborate: " placeholder="Optional" disabled={!(gender==="other")}/>}
                </div>
                <div>
                    <span>Status</span>
                    <Status/>
                </div>
                <div>
                    <span>I am open to sharing with up to: </span>
                    <ShareLimit/>
                </div>
                <div>
                    <p>Min and max monthly rent</p>
                    <span>$</span><input type="number" min="0.00" step="0.01" placeholder="500.00" onChange={(e)=>{setMinRent(e.target.value)}}/>
                    <span>$</span><input type="number" min="0.00" step="0.01" placeholder="1500.00" onChange={(e)=>{setMaxRent(e.target.value)}}/>
                </div>
                <span>Interested Area</span>
                <InterestedArea/>
                <YNButton label="Pet Friendly?:" name="petFriendly" checked={petFriendly==="no"} onChange={(e)=>{setPetFriendly(e.target.value)}}/><span>{petFriendly}</span>
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