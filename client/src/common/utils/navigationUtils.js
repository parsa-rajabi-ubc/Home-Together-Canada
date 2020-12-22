/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: navigation functions
 *
 */

// takes route and pushes as parameter
export const pushToRoute = (history, route, state) => {
    history.push({
        pathname: route,
        state: {...state}
    });
}