/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: returns a filtered list of data for a given limit
 *
 */

export function limitResults(profiles, limit, start) {
    return profiles.slice(start, (limit < profiles.length - start) ? start + limit : profiles.length);
}