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

export const dropdownDefaultTheme = theme => ({
    ...theme,
    borderRadius: 8,
    colors: {
        ...theme.colors,
        neutral50: '#A0AEBF',  // Placeholder color
    }
})


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

export const dropdownAccountCSS = {
    control: base => ({
            ...base,
            height: 40,
            width: 125,
            marginTop: 8,
            borderColor: "white",
            backgroundColor: "white",
            boxShadow: 'none',
            border: 0,
            ':hover': {
                backgroundColor: '#D6B765',
                borderColor: 'white',
            }
        }
    ),
    menuPortal: base => ({...base, zIndex: 9999}),
    // removes the "stick"
    indicatorSeparator: () => {
    },
    dropdownIndicator: defaultStyles => ({
        ...defaultStyles,
        // changes arrow color
        color: 'black'
    })
}

export const dropdownAccountTheme = theme => ({
    ...theme,
    borderRadius: 10,
    colors: {
        ...theme.colors,
        neutral50: 'black'
    }
})

export const dropdownSearchAreaCSS = {
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
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            fontSize: "95%",
        }
    }
}