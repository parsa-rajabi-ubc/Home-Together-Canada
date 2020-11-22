/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Const list of cities per province.
 *
 */
import 'canada';
const canada = require('canada');

const provinces = [
    { id: 1, value: 'ALBERTA' },
    { id: 2, value: 'BRITISH COLUMBIA' },
    { id: 3, value: 'MANITOBA' },
    { id: 4, value: 'NEW BRUNSWICK' },
    { id: 5, value: 'NEWFOUNDLAND AND LABRADOR' },
    { id: 6, value: 'NOVA SCOTIA' },
    { id: 7, value: 'ONTARIO' },
    { id: 8, value: 'PRINCE EDWARD ISLAND' },
    { id: 9, value: 'QUEBEC' },
    { id: 10, value: 'SASKATCHEWAN' },
    { id: 11, value: 'Northwest Territories' },
    { id: 12, value: 'Nunavut' },
    { id: 13, value: 'Yukon' }
];
let cities = [];
let name;
let citylist = [];
provinces.forEach(cityFunc);

function cityFunc(province, index){
    name = province.value;
    citylist = [];
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