const express = require('express')
const sql = require('../db')

const route = express.Router()

route.get('/', (req, res) => {
    sql.query('select * FROM Team_Count_Uni_All ', (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Request: ${err}`)
        }

        return res.status(200).send(result)
    })
})

route.post('/add', (req, res) => {
    //syntax : http://localhost:5000/api/university/add?uni_name=iba&uni_campus=main
    const { uni_name } = req.query
    console.log()
    if (!uni_name) {
        return res.status(400).send('Please input University Name and Campus')
    }

    const INSERT_QUERY = `INSERT INTO University(uni_name)VALUES ('${uni_name}')`;

    sql.query(INSERT_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.status(200).send(result)
    })
})

route.put('/edit', (req, res) => {
    const { uni_id, uni_name } = req.query

    if (!uni_id || !uni_name) {
        return res.status(400).send('Invalid Request')
    }

    const UPDATE_QUERY = `Update University set uni_name = '${uni_name}' where uni_id = ${uni_id};`
    console.log(UPDATE_QUERY)
    sql.query(UPDATE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.status(200).send(result)
    })
})

route.delete('/delete', (req, res) => {
    const { uni_id } = req.query

    if (!uni_id) {
        return res.status(400).send('Invalid Request')
    }

    const DELETE_QUERY = `delete from University where uni_id = ${uni_id}`

    sql.query(DELETE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.status(200).send(result)
    })
})

module.exports = route