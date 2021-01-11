/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.10
 *
 * @Description: CSS utility file for dropdown CSS based on its state
 *
 */

export const dropdownDefaultCSS = {
    control: base => ({
            ...base,
            marginTop: 4,
            borderColor: "#e2e8f0",
            marginBottom: 16,
            paddingTop: 2,
            paddingBottom: 2,
        }
    ),
    menuPortal: base => ({...base, zIndex: 9999}),
}

export const dropdownErrorCSS = {
    control: base => ({
            ...base,
            marginTop: 4,
            borderColor: 'red',
            marginBottom: 16,
            paddingTop: 2,
            paddingBottom: 2,
            ':hover': {
                borderColor: 'red'
            }
        }
    ),
    menuPortal: base => ({...base, zIndex: 9999}),
}