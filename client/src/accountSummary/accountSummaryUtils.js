/**
 * @Author:     Jeff Hatton/AlexQin
 * @Created:    2020.01.16
 *
 * @Description: Utility file for functions for account summary forms
 *
 */
import {isStringEmpty} from "../common/utils/stringUtils";
import {getLogoURL} from "../common/utils/imageUtils";

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

const prepareMailingAddress = user => {
    return {
        mailingAddressLine1: resolveOptionalField(user.mailingAddressLine1),
        mailingAddressLine2: resolveOptionalField(user.mailingAddressLine2),
        mailingCity: resolveOptionalField(user.mailingCity),
        mailingPostalCode: resolveOptionalField(user.mailingPostalCode),
        mailingProvince: resolveOptionalField(user.mailingProvince)
    }
}

export const resolveOptionalField = (field) => !field ? undefined : field;

export const prepareBusinessAccountInfo = (business) => {
    return {
        ...business,
        addressLine2: resolveOptionalField(business.addressLine2),
        ...(!!business.logo && {logo: getLogoURL(business.logo)}),
        ...(prepareMailingAddress(business)),
        mapAddressLine1: resolveOptionalField(business.mapAddressLine1),
        mapAddressLine2: resolveOptionalField(business.mapAddressLine2),
        mapCity: resolveOptionalField(business.mapCity),
        mapPostalCode: resolveOptionalField(business.mapPostalCode),
        mapProvince: resolveOptionalField(business.mapProvince),
        website: resolveOptionalField(business.website)
    }
}

export const prepareMemberAccountInfo = member => {
    return {
        ...member,
        addressLine2: resolveOptionalField(member.addressLine2),
        ...prepareMailingAddress(member)
    }
}
