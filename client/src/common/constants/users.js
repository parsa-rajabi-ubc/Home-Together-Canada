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
    }
];

export const ALL_SUBPAGES = {
    ACCOUNT_INFO: 'Account Info',
    PROFILE: 'Profile',
    SEARCH_CRITERIA: 'Search Criteria',
    PASSWORD: 'Password',
    MESSAGING: 'Messaging',
    MANAGE_LISTINGS: 'Manage Listings',
    ACTIVATE: 'Activate Account',
    DEACTIVATE: 'Deactivate Account',
    DELETE: 'Delete Account'
};

export const ADMIN_SUBPAGES = {
    MANAGE_USERS: 'Manage Users',
    MANAGE_ADMINS: 'Manage Admins',
    PENDING_LISTINGS: 'Pending Listings',
    EXPORT_PAGE: 'Export'
}