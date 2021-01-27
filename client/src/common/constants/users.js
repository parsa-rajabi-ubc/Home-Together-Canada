/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.20
 *
 * @Description: constants used for users
 *
 */

export const USER_TYPES = {
    MEMBER: 'member',
    BUSINESS: 'business',
    UNREGISTERED: null
}

export const MEMBER_SUBPAGES = [
    {
        label: 'Account Info',
        value: 'Account Info'
    },
    {
        label: 'Profile',
        value: 'Profile'
    },
    {
        label: 'Search Criteria',
        value: 'Search Criteria'
    },
    {
        label: 'Password',
        value: 'Password'
    },
    {
        label: 'Messaging',
        value: 'Messaging'
    },
    {
        label: 'Manage Listings',
        value: 'Manage Listings'
    },
    {
        label: 'Activate/De-activate',
        value: 'Activate/De-activate'
    },
    {
        label: 'DeleteAccount',
        value: 'DeleteAccount'
    }
];

export const BUSINESS_SUBPAGES = [
    {
        label: 'Account Info',
        value: 'Account Info'
    },
    {
        label: 'Password',
        value: 'Password'
    },
    {
        label: 'Manage Listings',
        value: 'Manage Listings'
    },
    {
        label: 'DeleteAccount',
        value: 'DeleteAccount'
    }
];

export const ALL_SUBPAGES = {
    ACCOUNT_INFO: 'Account Info',
    PROFILE: 'Profile',
    SEARCH_CRITERIA: 'Search Criteria',
    PASSWORD: 'Password',
    MESSAGING: 'Messaging',
    MANAGE_LISTINGS: 'Manage Listings',
    ACTIVATE_DEACTIVATE: 'Activate/De-activate',
    DELETE: 'DeleteAccount'
};