/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.15
 *
 * @Description: controller functions for Lives With model
 *
 */


const db = require("../models");

const LivesWith = db.livesWith;

const findAllRoommates = (req, res) => {
    LivesWith.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while getting all roomates"
        }));
}

module.exports = {
    findAllRoommates
}