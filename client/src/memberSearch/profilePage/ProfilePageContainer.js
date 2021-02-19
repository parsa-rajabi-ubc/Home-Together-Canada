/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.1
 *
 * @Description: Profile Page Container;
 *
 */
import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import {getMemberAge} from "../../common/utils/generalUtils";
import get from "lodash/get";
import PropTypes from "prop-types";

import * as MemberService from '../../services/MemberService';
import {SESSION_ERR} from "../../common/constants/errors";
import {getConcatenatedErrorMessage} from "../../registration/registrationUtils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {reset} from "../../redux/actionCreators";

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ reset }, dispatch);
}

const ERROR = 'There was an error loading profile';

const ProfilePageContainer = props => {
    const { reset } = props;
    const {username} = useParams();
    const [profile, setProfile] = useState({});
    const [areasOfInterest, setAreasOfInterest] = useState([]);
    const [roommates, setRoommates] = useState([]);

    const [partnerOrGroupMembersLabel, setPartnerOrGroupMembersLabel] = useState('');
    const [roommateUsernamesHyperLinks, setRoommateUsernamesHyperLinks] = useState([]);
    const [preferredLocations, setPreferredLocations] = useState([]);
    const [prefLocationText, setPrefLocationText] = useState('');


    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // get profile object
    useEffect(() => {
        setLoading(true);
        // profile page was navigated to via search results page
        if (props.location && props.location.state) {
            const { profile } = props.location.state;
            setProfile(profile);
            setAreasOfInterest(profile.areasOfInterest);
            setRoommates(profile.roommates || []);
            setError(false);
        }
        // profile page was navigated to via another profile
        else {
            MemberService.findMemberProfileByUsername(username)
                .then(res => res.json())
                .then(data => {
                    if (data.profile) {
                        setProfile(data.profile);
                        setAreasOfInterest(data.profile.areasOfInterest);
                        setRoommates(data.profile.roommates || []);
                        setError(false);
                    } else if (!data.authenticated && typeof data.authenticated === 'boolean') {
                        reset();
                        alert(SESSION_ERR);
                    } else if (data.err) {
                        alert('Error: ' + data.err);
                        setError(true);
                        setLoading(false);
                    } else if (data.errors) {
                        const errorMessage = getConcatenatedErrorMessage(data.errors);
                        // show list of all errors
                        alert(errorMessage);
                        setError(true);
                        setLoading(false);
                    } else {
                        alert(ERROR);
                        setError(true);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    alert('Error: ' + err.message);
                    setError(true);
                    setLoading(false);
                });
        }
    }, [username])

    // update values from profile that require manipulation
    useEffect(() => {
        setLoading(true);
        if ((profile.status === 'Couple' || profile.status === 'Couple With Children')) {
            setPartnerOrGroupMembersLabel("Partner");
        } else if (profile.status === 'Existing Group') {
            setPartnerOrGroupMembersLabel("Group Members");
        }

        setRoommateUsernamesHyperLinks(roommates.map(person =>
            (<Link to={`${person}`} key={person}>
                <span className={"hover:underline text-blue-600"}>{person} </span>
            </Link>)));

        setPreferredLocations(areasOfInterest.map(location => `${location.city}, ${location.province} \n`));

        setPrefLocationText(areasOfInterest.length > 1 ? "Preferred Locations" : "Preferred Location");

        setLoading(false);
    }, [profile, areasOfInterest, roommates]);

    return (
        <div>
            {!loading &&
                <div>
                    {error
                        ? <div>{ERROR}</div>
                        : <ProfilePage
                            username={profile.username}
                            age={getMemberAge(profile.birthYear)}
                            gender={profile.gender}
                            genderDescription={profile.genderDescription}
                            shareLimit={profile.numRoommates}
                            workStatus={profile.workStatus}
                            familyStatus={profile.status}
                            roommates={roommates}
                            partnerOrGroupMembersLabel={partnerOrGroupMembersLabel}
                            roommateUsernames={roommateUsernamesHyperLinks}
                            minRent={profile.minMonthlyBudget.toString()}
                            maxRent={profile.maxMonthlyBudget.toString()}
                            prefLocationText={prefLocationText}
                            preferredLocations={preferredLocations}
                            about={profile.bio || ''}
                            petFriendly={profile.hasPets}
                            petDescription={get(profile, 'petsDescription', '')}
                            smokeFriendly={profile.isSmoker}
                            smokingDescription={get(profile, 'smokingDescription', '')}
                            hasHealthMobilityIssues={profile.hasHealthMobilityIssues}
                            healthMobilityIssuesDescription={get(profile, 'healthMobilityIssuesDescription', '')}
                            hasAllergies={profile.hasAllergies}
                            allergiesDescription={get(profile, 'allergiesDescription', '')}
                            isReligionImportant={profile.isReligionImportant}
                            religionDescription={get(profile, 'religionDescription', '')}
                            isDietImportant={profile.isDietImportant}
                            dietDescription={get(profile, 'dietDescription', '')}
                            hasHomeToShare={profile.hasHomeToShare}
                            hasHomeToShareDescription={get(profile, 'hasHomeToShareDescription', '')}
                            interestInBuyingHome={profile.isInterestedInBuyingHome}
                            interestDescription={get(profile, 'interestDescription', '')}
                        />
                    }
                </div>
            }
        </div>
    );
}

ProfilePageContainer.propTypes = {
    reset: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
        state: PropTypes.object
    })
}

export default connect(null, mapDispatchToProps)(ProfilePageContainer);