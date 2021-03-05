/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.01.19
 *
 * @Description: Privacy Policy page
 *
 */

import React from 'react';
import {PRIVACY_POLICY} from "../common/constants/privacyPolicyText";

function PrivacyPolicy() {
    return (
        <div id={"Privacy"} className={"tos-page-layout"}>
            <h1 className={"page-title"}>{PRIVACY_POLICY.title}</h1>
            <p className={"text"}>{PRIVACY_POLICY.subParagraph1}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point1Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point1Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point2Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point2TextA}</p>
            <br/>
            <p className={"sub-point text"}>{PRIVACY_POLICY.point2SubpointA}</p>
            <p className={"sub-point text"}>{PRIVACY_POLICY.point2SubpointB}</p>
            <p className={"sub-point text"}>{PRIVACY_POLICY.point2SubpointC}</p>
            <p className={"sub-point text"}>{PRIVACY_POLICY.point2SubpointD}</p>
            <br/>
            <p className={"text"}>{PRIVACY_POLICY.point2TextB}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point3Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point3Text1}</p>
            <br/>

            <p className={"sub-point text"}>{PRIVACY_POLICY.point3SubpointA}</p>
            <p className={"sub-point text"}>{PRIVACY_POLICY.point3SubpointB}</p>
            <p className={"sub-point text"}>{PRIVACY_POLICY.point3SubpointC}</p>
            <p className={"sub-point text"}>{PRIVACY_POLICY.point3SubpointD}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point4Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point4Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point5Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point5Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point6Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point6Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point7Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point7Text}</p>
            <br/>

            <p className={"sub-point text"}>{PRIVACY_POLICY.point7SubpointA}</p>
            <p className={"sub-point text"}>{PRIVACY_POLICY.point7SubpointB}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point8Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point8Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point9Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point9Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point10Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point10Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point11Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point11Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point12Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point12Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point13Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point13Text}</p>
            <br/>

            <h2 className={"point-title"}>{PRIVACY_POLICY.point14Title}</h2>
            <p className={"text"}>{PRIVACY_POLICY.point14Text}</p>
            <br/>
        </div>
    );
}

export default PrivacyPolicy;