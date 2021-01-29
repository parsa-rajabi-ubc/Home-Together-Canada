import PropTypes from "prop-types";

/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: returns a filtered list of data for a given limit
 *
 */

export function LimitResults(profiles, limit){
    const filteredResults = [];
    for (let i = 0; i < limit; i++) {
        filteredResults.push(profiles[i]);
    }
    return filteredResults;
}

LimitResults.propTypes = {
    profiles: PropTypes.array,
    limit: PropTypes.number
};