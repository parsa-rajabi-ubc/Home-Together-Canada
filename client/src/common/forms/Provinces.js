/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.09
 *
 * @Description: list of provinces in Canada in alphabetical order
 *
 */
import 'canada';
const canada = require('canada');
let pid=0;
const r = canada.regions;
const provinces = [];
for (let key in r ){
    pid = pid +1;
    provinces.push({
        id: pid,
        value: r[key]
    })
}
export default provinces