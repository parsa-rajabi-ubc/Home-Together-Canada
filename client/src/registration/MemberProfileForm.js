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

//Returns a Form with fields
function MemberProfileForm() {
    const [gender, setGender] = useState(true);
    const [partner, setPartner] = useState(false);
    const [group,setGroup] = useState(false);
    const [petFriendly, setPetFriendly] = useState(false);
    const [smoking, setSmoking] = useState(false);
    const [mobilityIssues, setMobilityIssues] = useState(false);
    const [hasAllergies, setHasAllergies] = useState(false);
    const [religious, setReligious] = useState(false);
    const [hasDiet, setHasDiet] = useState(false);
    const [hasHome, setHasHome] = useState(false);

    return (
        <div>
            <h1>Member Sign Up:</h1>
            <hr/>
            <form>
                <div>
                    <p>Gender</p>
                    <RadioButton label="Male: " name="male" value="male" checked={gender} onChange={onchange}/>
                    <RadioButton label="Female: " name="female" value="female" checked={!gender} onChange={onchange}/>
                    <RadioButton label="Other: " name="other" value="other" checked={!gender} onChange={onchange}/>
                    <TextArea label="Preferred Pronoun: " placeholder="Pronoun"/>
                </div>
                <TextArea label="Year of Birth: " placeholder="" onChange={onchange} />
                <div>
                    <p>Status</p>
                    <Dropdown name="status" title={"Status"} items={statuses} onChange={onchange}/>
                    <TextArea label="Partner's username(s): " placeholder="username(s)" onChange={onchange}/>
                </div>
                <div>
                    <p>I am open to sharing with up to: </p>
                    <Dropdown name="shareLimit" items={shareLimits} title={"Share Limit"} onChange={onchange}/>
                </div>
                <div>
                    <p>Work Status</p>
                    <Dropdown name="work status" title={"Work Status"} items={workStatuses} onChange={onchange}/>
                    <p>Max monthly rent</p>
                    <span>$</span><input type="number" min="0.00" step="0.01" placeholder="1500.00"/>
                </div>
                <PreferredArea/>
                <Button label="Add another area: " value="+" onClick={onclick}/>
                <YNButton label="Pet Friendly?:" checked={petFriendly} onChange={onchange}/>
                <YNButton label="Smoking Friendly?:" checked={smoking} onChange={onchange}/>
                <YNButton label="Health or Mobility Issues?:" checked={mobilityIssues} onChange={onchange}/>
                <YNButton label="Allergies?:" checked={hasAllergies} onChange={onchange}/>
                <YNButton label="Religion is important to me?:" checked={religious} onChange={onchange}/>
                <YNButton label="The diet of others in my home is important to me?:" checked={hasDiet} onChange={onchange}/>
                <YNButton label="I have a home to share?:" checked={hasHome} onChange={onchange}/>

            </form>
        </div>
    );
}
export default MemberProfileForm;