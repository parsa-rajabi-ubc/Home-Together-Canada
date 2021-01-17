/**
 * @Author:     Jeff Hatton/AlexQin
 * @Created:    2020.01.16
 *
 * @Description: Utility file for functions for account summary forms
 *
 */
import {isStringEmpty} from "../common/utils/stringUtils";

// seperate the phone number:
export function splitPhoneNumber(phoneNumber){
    if (isStringEmpty(phoneNumber)) {
        return undefined;
    } else {
        const splitPhoneNumber = phoneNumber.split("-");
        if (splitPhoneNumber.length !== 3){
            //invalid phone structure
            return undefined;
        } else {
            const splitPhoneNumberObject = {
                first: splitPhoneNumber[0],
                middle: splitPhoneNumber[1],
                last: splitPhoneNumber[2]
            }
            return splitPhoneNumberObject;
        }
    }
}