const express = require('express');
const sql = require('../db')

const route = express.Router()

route.get('/', (req, res) => {
    sql.query('CALL General_Info()', (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})


module.exports = route