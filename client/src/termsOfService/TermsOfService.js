/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.13
 *
 * @Description: Terms of service page
 *
 */

import React from 'react';
import { TERMS_OF_SERVICE } from "../common/constants/termsOfServiceText";

function TermsOfService() {
    return (
        <div>
                <h1>{TERMS_OF_SERVICE.title}</h1>
                <p>{TERMS_OF_SERVICE.subParagraph1}</p>
                <br/>
                <p>{TERMS_OF_SERVICE.subParagraph2}</p>
                <br/>
                <h2>{TERMS_OF_SERVICE.point1Title}</h2>
                <p>{TERMS_OF_SERVICE.point1Text}</p>
                <br/>
                <h2>{TERMS_OF_SERVICE.point2Title}</h2>
                <p>{TERMS_OF_SERVICE.point2Text}</p>
                <br/>
                <h2>{TERMS_OF_SERVICE.point3Title}</h2>
                <p>{TERMS_OF_SERVICE.point3Text1}</p>
                <p>{TERMS_OF_SERVICE.point3SubpointA}</p>
                <p>{TERMS_OF_SERVICE.point3SubpointB}</p>
                <p>{TERMS_OF_SERVICE.point3SubpointC}</p>
                <p>{TERMS_OF_SERVICE.point3Text2}</p>
                <br/>
                <h2>{TERMS_OF_SERVICE.point4Title}</h2>
                <p>{TERMS_OF_SERVICE.point4Text}</p>
                <br/>
                <h2>{TERMS_OF_SERVICE.point5Title}</h2>
                <p>{TERMS_OF_SERVICE.point5Text}</p>
                <br/>
                <h2>{TERMS_OF_SERVICE.point6Title}</h2>
                <p>{TERMS_OF_SERVICE.point6Text}</p>
                <br/>
                <h2>{TERMS_OF_SERVICE.point7Title}</h2>
                <p>{TERMS_OF_SERVICE.point7Text}</p>
                <br/>
                <h2>{TERMS_OF_SERVICE.point8Title}</h2>
                <p>{TERMS_OF_SERVICE.point8Text}</p>

        </div>
    );
}

export default TermsOfService;