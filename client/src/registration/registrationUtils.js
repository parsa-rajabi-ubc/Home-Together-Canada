/**
 * @Author:     Alex Qin
 * @Created:    2020.11.10
 *
 * @Description: Show all the years that allowed users to select:
 *
 */

const currentYear = new Date().getFullYear();
const RegistrationUtils = [];

for (let j = 0, i = currentYear-18; i >= currentYear - 98; i--,j++) {
    RegistrationUtils.push({
        id : j,
        value : i}
    )
}
export default RegistrationUtils

