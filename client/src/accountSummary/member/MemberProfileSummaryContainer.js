/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.02.01
 *
 * @Description: Container for MemberProfileSummary
 *
 */
import React, {useState, useEffect} from 'react';
import MemberService from '../../services/MemberService';
import MemberProfileSummary from "./MemberProfileSummary";

const MemberProfileSummaryContainer = () => {
    const [memberProfile, setMemberProfile] = useState({});
    const [areasOfInterest, setAreasOfInterest] = useState([]);
    const [roommates, setRoommates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        MemberService.getMemberProfileInfo()
            .then(res => res.json())
            .then(data => {
                setMemberProfile(data.member.profile);
                setAreasOfInterest(data.member.areasOfInterest);
                setRoommates(data.member.roommates);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {!loading &&
            <MemberProfileSummary
                profile={memberProfile}
                areasOfInterestList={areasOfInterest}
                roommates={roommates}/>
            }
        </div>
    )
}

export default MemberProfileSummaryContainer;
