const express = require('express')
const sql = require('../db')

const route = express.Router()

route.get('/', (req, res) => {
    sql.query('SELECT * FROM ParticipantInfo', (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Query: ${err}`)
        }

        res.send(result)
    })
})


route.put('/modify', (req, res) => {
    const { p_id, p_name, p_num, p_email } = req.query;

    if (!p_id || !p_name || !p_num || !p_email) {
        return res.status(400).send('Invalid Request')
    }

    const UPDATE_QUERY = `UPDATE Participants Set p_name = '${p_name}', p_num = '${p_num}', p_email = '${p_email}' where p_id = ${p_id};`

    sql.query(UPDATE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.status(200).send(result)
    })

})

route.delete('/delete', (req, res) => {
    const { p_id } = req.query;

    if (!p_id) {
        return res.status(400).send('Invalid Request');
    }

    const DELETE_QUERY = `DELETE FROM Participants where p_id = ${p_id}`

    sql.query(DELETE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Query: ${err}`)
        }

        res.status(200).send(result)
    })
})

module.exports = route