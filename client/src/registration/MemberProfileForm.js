/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.16
 *
 * @Description: Member profile static form Component. Returns a form.
 *
 */
import React, {useState} from 'react';
import TextArea from '../common/forms/TextArea';
import RadioButton from "../common/forms/RadioButton";
import YNButton from "../common/forms/YNButtons";
import LargeTextArea from "../common/forms/LargeTextArea";
import InterestedArea from "../common/forms/InterestedArea";
import Status from "../common/forms/Status";
import ShareLimit from "../common/forms/ShareLimits";
import SubmitButton from "../common/forms/SubmitButton";
import Button from "../common/forms/Button";
import {isStringEmpty} from "../common/utils/stringUtils";
import {Link} from "react-router-dom";

//Returns a Form with fields
function MemberProfileForm() {
    const [gender, setGender] = useState("");
    const [petFriendly, setPetFriendly] = useState("");
    const [smoking, setSmoking] = useState("");
    const [mobilityIssues, setMobilityIssues] = useState("");
    const [hasAllergies, setHasAllergies] = useState("");
    const [religious, setReligious] = useState("");
    const [hasDiet, setHasDiet] = useState("");
    {/*TODO: Remove OR ADD this back depending on what Twila says*/
    }
    // const [hasHome, setHasHome] = useState("");
    const [minRent, setMinRent] = useState("500.00");
    const [maxRent, setMaxRent] = useState("1500.00");
    const [aboutSelf, setAboutSelf] = useState("");
    const [selectedLimit, setsSelectedLimit] = useState(null);
    const [selectedStatus, setsSelectedStatus] = useState(null);
    const [partners, setPartners] = useState(null);
    const [groupMembers, setGroupMembers] = useState(null);

    const handleStatusChange = e => {
        setsSelectedStatus(e.value);
    }

    function checkStatus(selectedStatus) {
        if (selectedStatus === "Couple") {
            return <TextArea className={"input"} labelClassName={"label"} placeholder={"Partner's username"} label={null} onChange={(e) => {
                setPartners(e.target.value)
            }}/>
        } else if (selectedStatus === "Couple With Children") {
            return <TextArea className={"input"} labelClassName={"label"} placeholder={"Partner's username"} label={null} onChange={(e) => {
                setPartners(e.target.value)
            }}/>
        } else if (selectedStatus === "Existing Group") {
            return <TextArea className={"input"} labelClassName={"label"} placeholder={"Member's username(s) - divided by comma"} label={null} onChange={(e) => {
                setGroupMembers(e.target.value)
            }}/>
        }

    }
    const handleLimitChange = e => {
        setsSelectedLimit(e.value);
    }
    // TODO: convert this into an array of errors
    const isFormValid = () => {
        return true;
    }

//function for input checks on submit
    function onSubmit(event) {
        if (!isFormValid()) {
            event.preventDefault();
            return;
        }
        const registrationData = {
            gender: gender
        }

        //TODO: update this with MemberService.registerMemberUser(registrationData) after it has been implemented

        // RegistrationService.registerBusinessUser(registrationData)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (!!data && data.authenticated) {
        //             // user is authenticated, redirect to home screen
        //             return history.push('/');
        //         } else if (!!data && !data.authenticated) {
        //             // something went wrong with the AUTHENTICATION (not the user creation)
        //             alert('Registration failed');
        //         } else if (!!data && data.errors && data.errors.length) {
        //             const errorMessage = getConcatenatedErrorMessage(data.errors);
        //             // show list of all errors
        //             alert(errorMessage);
        //         }
        //     })
        //     .catch((error) => {
        //         alert('Something went wrong creating your user. Please try again. Error: ' + error);
        //     });
    }

    return (
        <div>
            {/*Profile*/}
            <div className="mt-10 sm:mt-0">
                <div className="m-10 md:grid md:grid-cols-4 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="info-header">Profile Details</h3>
                            <p className="info-text">
                                This information is about your home-sharing preferences
                            </p>
                        </div>
                        <Link to={'/registration/member'} className="px-4 text-center sm:px-6">
                            <Button value={"Back to Registration Page"} className="text-base btn btn-blue"/>
                        </Link>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="overflow-hidden shadow sm:rounded-md">
                            <div className="px-4 py-6 bg-white sm:p-5">
                                <div className="grid grid-cols-2 gap-6 ">
                                    <div className="col-span-3 sm:col-span-2">
                                        <label className={"label"}> Gender </label>
                                        <div className={"my-2"}>
                                            <RadioButton label="Male" name="gender" value="male"
                                                         checked={gender === "male"} onChange={(e) => {
                                                setGender(e.target.value)
                                            }}/>
                                            <RadioButton label="Female" name="gender" value="female"
                                                         checked={gender === "female"} onChange={(e) => {
                                                setGender(e.target.value)
                                            }}/>
                                            <RadioButton label="Other " name="gender" value="other"
                                                         checked={gender === "other"} onChange={(e) => {
                                                setGender(e.target.value)
                                            }}/>
                                            {(gender === "other") &&
                                            <TextArea className="input mt-0" labelClassName={"label mt-5"} label={""}
                                                      placeholder="Optional: what gender do you identify as?"
                                                      disabled={!(gender === "other")}/>}
                                        </div>
                                        <label className={"label"}> Status </label>

                                        <Status onChange={handleStatusChange}/>
                                        {checkStatus(selectedStatus)}

                                        <label className={"label text-base "}> open to sharing with </label>
                                        <ShareLimit onChange={handleLimitChange}/>
                                        <div className={"label"}>Monthly Rent</div>
                                        <div className="grid grid-cols-6 gap-x-6">
                                            <div className="column-span-6-layout">
                                                <input className={"input label font-normal "} type="number" min="0"
                                                       step="25" placeholder="MIN $ CAD" onChange={(e) => {
                                                    setMinRent(e.target.value)
                                                }}/>
                                            </div>
                                            <div className="column-span-6-layout">
                                                <input className={"input label font-normal "} type="number"
                                                       min={minRent} step="25" placeholder=" MAX $ CAD"
                                                       onChange={(e) => {
                                                           setMaxRent(e.target.value)
                                                       }}/>
                                            </div>
                                        </div>
                                        <label className={"label"}>Interested Area</label>
                                        <InterestedArea/>
                                        <div className="grid grid-cols-6 gap-x-6">
                                            <div className="column-span-6-layout">
                                                <YNButton label="Pet Friendly?" name="petFriendly" onChange={(e) => {
                                                    setPetFriendly(e.target.value)
                                                }}/>
                                                {(petFriendly === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Smoking Friendly?" name="smoking" onChange={(e) => {
                                                    setSmoking(e.target.value)
                                                }}/>
                                                {(smoking === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Health / Mobility Issues?" name="mobile"
                                                          onChange={(e) => {
                                                              setMobilityIssues(e.target.value)
                                                          }}/>
                                                {(mobilityIssues === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Allergies?" name="allergies"
                                                          checked={hasAllergies === "no"} onChange={(e) => {
                                                    setHasAllergies(e.target.value)
                                                }}/>
                                                {(hasAllergies === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Is religion important?" name="religion"
                                                          checked={religious === "no"} onChange={(e) => {
                                                    setReligious(e.target.value)
                                                }}/>
                                                {(religious === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            <div className="column-span-6-layout">
                                                <YNButton label="Is diet of others important?" name="diet"
                                                          checked={hasDiet === "no"} onChange={(e) => {
                                                    setHasDiet(e.target.value)
                                                }}/>
                                                {(hasDiet === "yes") &&
                                                <TextArea className={"input"} placeholder="Elaborate" label={""}/>}
                                            </div>
                                            {/*TODO: Remove OR ADD this back depending on what Twila says*/}
                                            {/*<div className="column-span-6-layout">*/}
                                            {/*    <YNButton label="I have a home to share" name="hasHome" checked={hasHome==="no"} onChange={(e)=>{setHasHome(e.target.value)}}/>*/}
                                            {/*    {(hasHome==="yes") && <TextArea className={"input"} placeholder="Elaborate:" label={null}/>}*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className={"mt-4"}>
                                            <LargeTextArea label="Tell others about yourself: " name="aboutSelf"
                                                           placeholder="What is important to you, and why do you want to share a home?"
                                                           onChange={(e) => {
                                                               setAboutSelf(e.target.value)
                                                           }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 pt-4 mt-4 text-center sm:px-6">
                            <SubmitButton label={""} inputValue={"Create Account"}
                                          className="text-base btn btn-green"
                                          onClick={onSubmit}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MemberProfileForm;