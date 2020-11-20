/**
 * @Author:     Alex Qin
 * @Created:    2020.11.10
 *
 * @Description: Show all the years that allowed users to select:
 *
 */

const currentYear = new Date().getFullYear();
const YEARS = [];

for (let j = 0, i = currentYear-16; i >= currentYear - 96; i--,j++) {
    YEARS.push({
        id : j,
        value : i}
    )
}
export default YEARS