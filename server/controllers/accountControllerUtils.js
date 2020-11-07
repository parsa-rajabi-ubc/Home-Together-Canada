const getMailingAddress = (body) => {
    return body.hasDifferentMailingAddress ?
        {
            mailingAddressLine1: body.mailingAddressLine1,
            mailingAddressLine2: body.mailingAddressLine2,
            mailingCity: body.mailingCity,
            mailingProvince: body.mailingProvince,
            mailingPostalCode: body.mailingPostalCode
        } :
        {
            mailingAddressLine1: body.addressLine1,
            mailingAddressLine2: body.addressLine2,
            mailingCity: body.city,
            mailingProvince: body.province,
            mailingPostalCode: body.postalCode
        }
}

module.exports = {
    getMailingAddress
}