/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Const list of cities per province.
 *
 */
import provinces from "./Provinces";
import 'canada';
const canada = require('canada');
const cities = [];
provinces.forEach(cityFunc);

function cityFunc(province, index){
    let name = province.value;
    let citylist = [];
    switch(index){
        case 0: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "AB") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 1: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "BC") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 2: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "MB") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 3: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "NB") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 4: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "NL") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 5: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "NS") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 6: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "ON") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 7: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "PE") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 8: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "QC") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            });
            break
        }
        case 9: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "SK") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 10: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "NT") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 11: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "NU") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
            break
        }
        case 12: {
            let idx = 0;
            canada.cities.forEach(function (cityData) {
                if (cityData[1] === "YT") {
                    idx = idx + 1;
                    citylist.push({
                        id: idx,
                        value: cityData[0]
                    })
                }
            })
        }
    }
    cities.push({
        name: name,
        citylist: citylist
    })
}
export default cities;