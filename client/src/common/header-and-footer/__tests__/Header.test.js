import React from 'react';
import renderer from  'react-test-renderer'
import Header from "../Header";
import {BrowserRouter, Link} from "react-router-dom";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

const setAccountType = jest.fn();
const setIsAdmin = jest.fn();
const setAuthenticated = jest.fn();
const setActive = jest.fn();

describe('Header', () => {
    describe('Header structure', () => {
        it('should match snapshot test', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };
            //when
            const component = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });

    describe('Search Member Profiles button', () => {
        it('should show Search Member Profiles button when the user is unregistered', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Search Member Profiles');

            // then
            expect(connectWithMembersButton).toBeDefined();
        });
        it('should show Search Member Profiles button when the user is a member', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Search Member Profiles');

            // then
            expect(connectWithMembersButton).toBeDefined();
        });
        it('should not show Search Member Profiles button when the user is a business', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'business',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Search Member Profiles');

            // then
            expect(connectWithMembersButton).toBeUndefined();
        });
    });

    describe('Home Sharing Services button', () => {
        it('should show Home Sharing Services button when the user is unregistered', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const servicesButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Home Sharing Services');

            // then
            expect(servicesButton).toBeDefined();
        });
        it('should show Home Sharing Services button when the user is a member', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const servicesButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Home Sharing Services');

            // then
            expect(servicesButton).toBeDefined();
        });
        it('should show Home Sharing Services button when the user is a business', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'business',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const servicesButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Home Sharing Services');

            expect(servicesButton).toBeDefined();
        });
    });

    describe('Local Classifieds button', () => {
        it('should show Local Classifieds button when the user is unregistered', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const classifiedsButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Local Classifieds');

            // then
            expect(classifiedsButton).toBeDefined();
        });
        it('should show Local Classifieds button when the user is a member', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const classifiedsButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Local Classifieds');

            // then
            expect(classifiedsButton).toBeDefined();
        });
        it('should show Local Classifieds button when the user is a business', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'business',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const classifiedsButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Local Classifieds');

            // then
            expect(classifiedsButton).toBeDefined();
        });
    });

    describe('About Us button', () => {
        it('should show About Us button when the user is unregistered', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const aboutUsButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'About Us');

            // then
            expect(aboutUsButton).toBeDefined();
        });
        it('should show About Us button when the user is a member', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const aboutUsButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'About Us');

            // then
            expect(aboutUsButton).toBeDefined();
        });
        it('should show About Us button when the user is a business', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'business',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const aboutUsButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'About Us');

            // then
            expect(aboutUsButton).toBeDefined();
        });
    });

    describe('FAQ button', () => {
        it('should show FAQ button when the user is unregistered', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const faqButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'FAQ');

            // then
            expect(faqButton).toBeDefined();
        });
        it('should show FAQ button when the user is a member', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const faqButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'FAQ');

            // then
            expect(faqButton).toBeDefined();
        });
        it('should show FAQ button when the user is a business', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'business',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const faqButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'FAQ');

            // then
            expect(faqButton).toBeDefined();
        });
    });

    describe('Create Listing button', () => {
        it('should show not show Create Listing button when the user is unregistered', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const createListingButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Create Listing');

            // then
            expect(createListingButton).toBeUndefined();
        });
        it('should show Create Listing button when the user is a member', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const createListingButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Create Listing');

            // then
            expect(createListingButton).toBeDefined();
        });
        it('should show Create Listing button when the user is a business', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'business',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const createListingButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Create Listing');

            // then
            expect(createListingButton).toBeDefined();
        });
    });

    describe('Admin button', () => {
        it('should show not show Admin button when the user is unauthenticated', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const adminButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Admin');

            // then
            expect(adminButton).toBeUndefined();
        });
        it('should show not Admin button when isAdmin is false', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const adminButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Admin');

            // then
            expect(adminButton).toBeUndefined();
        });
        it('should show Admin button when the user is authenticated and isAdmin is true', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: true,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const adminButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Admin');

            // then
            expect(adminButton).toBeDefined();
        });
    });

    describe('Login button', () => {
        it('should show Login button when the user is unauthenticated', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const loginButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Login');

            // then
            expect(loginButton).toBeDefined();
        });
        it('should not show Login button when user is authenticated', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const loginButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Login');

            // then
            expect(loginButton).toBeUndefined();
        });
    });

    describe('Sign Up button', () => {
        it('should show Sign Up button when the user is unauthenticated', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const signupButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Sign Up');

            // then
            expect(signupButton).toBeDefined();
        });
        it('should not show Sign Up button when user is authenticated', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const signupButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Sign Up');

            // then
            expect(signupButton).toBeUndefined();
        });
    });

    describe('Logout button', () => {
        it('should not show Logout button when the user is unauthenticated', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: null,
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const logoutButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Logout');

            // then
            expect(logoutButton).toBeUndefined();
        });
        it('should show Logout button when user is authenticated', () => {
            // given
            const props = {
                setAccountType,
                setIsAdmin,
                setAuthenticated,
                setActive,
                isAdmin: false,
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><Header {...props}/></BrowserRouter>).root;
            const logoutButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Logout');

            // then
            expect(logoutButton).toBeUndefined();
        });
    });
});