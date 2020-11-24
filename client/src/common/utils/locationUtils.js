/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Canadian cities and provinces
 *
 */

import 'canada';

const canada = require('canada');

export function getProvinces(){
    // get object mapping abbreviations to full names
    const provinces = canada.provinces;
    const territories = canada.territories;

    // get abbreviations
    const province_abbreviations = Object.keys(provinces);
    const territories_abbreviations = Object.keys(territories);

    // create array of provinces and territories (key, value)
    const provinces_list = [];
    const territories_list = [];

    for (let key in province_abbreviations ){
        provinces_list.push({
            //Example: "AB" : "AB"
            label: province_abbreviations[key],
            value: province_abbreviations[key]
        })
    }
    for (let key in territories_abbreviations ){
        territories_list.push({
            //Example: "YU" : "YU"
            label: territories_abbreviations[key],
            value: territories_abbreviations[key]
        })
    }
    return provinces_list.concat(territories_list);
}

export function getCities(prov){
    // create array of cities (key, value)
    const city_list = []
    canada.cities.map(function (cityData) {
        // look for cities that are in the province that was passed into the method (prov)
        if (prov === cityData[1]) {
            city_list.push({
                // Example: "Calgary" : "Calgary"
                label: cityData[0],
                value: cityData[0]
            })
        }
    })
    return city_list;
}