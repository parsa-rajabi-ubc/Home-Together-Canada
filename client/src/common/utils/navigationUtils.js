/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: navigation functions
 *
 */

// takes route and pushes as parameter
export const pushToRoute = (navigate, route, state) => {
    navigate(route,
        {state}
    );
}