const express = require('express');
const sql = require('../db')

const route = express.Router();

route.get('/', (req, res) => {
    sql.query('CALL Ambassador_Info()', (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})

route.post('/add', (req, res) => {
    const { a_name, a_contact, a_email, uni_id } = req.query

    if (!a_name || !a_contact || !a_email || !uni_id) {
        return res.status(400).send('Invalid Request')
    }

    const INSERT_QUERY = `INSERT INTO Ambassador (a_name, a_contact, a_email, uni_id) VALUES ('${a_name}', '${a_contact}', '${a_email}',${uni_id});`

    sql.query(INSERT_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})

route.put('/modify', (req, res) => {
    const { a_id, a_name, a_contact, a_email, uni_id } = req.query

    if (!a_id || !a_name || !a_contact || !a_email || !uni_id) {
        return res.status(400).send('Invalid Request')
    }

    const UPDATE_QUERY = `UPDATE Ambassador SET a_name='${a_name}',a_contact='${a_contact}',a_email='${a_email}',uni_id=${uni_id} WHERE a_id = ${a_id};`

    sql.query(UPDATE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})


route.delete('/delete', (req, res) => {
    
    const { a_id } = req.query
    
    sql.query(`DELETE FROM Ambassador WHERE a_id = ${a_id}`, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})

module.exports = route