const express = require('express');
const sql = require('../db')

const route = express.Router()

route.get('/', (req, res) => {
    sql.query('CALL Organizer_Info()', (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})

route.post('/add', (req, res) => {
    const { o_name, o_contact, o_email, m_id } = req.query

    if (!o_name || !o_contact || !o_email || !m_id) {
        return res.status(400).send('Invalid Request')
    }

    const INSERT_QUERY = `INSERT INTO Organizer (o_name, o_contact, o_email, m_id) VALUES ('${o_name}', '${o_contact}', '${o_email}',${m_id});`

    sql.query(INSERT_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})

route.put('/modify', (req, res) => {
    const { o_name, o_contact, o_email, m_id , o_id } = req.query

    if (!o_id || !o_name || !o_contact || !o_email || !m_id) {
        return res.status(400).send('Invalid Request')
    }

    const UPDATE_QUERY = `UPDATE Organizer SET o_name='${o_name}',o_contact='${o_contact}',o_email='${o_email}',m_id=${m_id} WHERE o_id = ${o_id};`
    
    sql.query(UPDATE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})

route.delete('/delete', (req, res) => {
    
    const { o_id } = req.query
    
    sql.query(`DELETE FROM Organizer WHERE o_id = ${o_id}`, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})

module.exports = route