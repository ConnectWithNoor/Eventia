const express = require('express')
const sql = require('../db')

const route = express.Router()

route.get('/', (req, res) => {
    sql.query('SELECT * FROM Modules', (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Query: ${err}`)
        }

        res.send(result)
    })
})

route.post('/add', (req, res) => {
    //syntax : http://localhost:5000/api/modules/add?m_name=pubg&m_price=600&m_date=2019-05-01
    const { m_name, m_price, m_date } = req.query

    if (!m_name || !m_price || !m_date) {
        return res.status(400).send(`Invalid Request`)
    }

    const INSERT_QUERY = `INSERT INTO Modules(m_name, m_price, m_date)VALUES ('${m_name}', ${m_price}, '${m_date}' )`;

    sql.query(INSERT_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.status(200).send(result)
    })
})

route.put('/modify', (req, res) => {

    const { m_id, m_name, m_price, m_date } = req.query

    if (!m_id || !m_name || !m_price || !m_date) {
        return res.status(400).send(`Invalid Request`)
    }

    const UPDATE_QUERY = `update Modules set m_name = '${m_name}', m_price = ${m_price}, m_date = '${m_date}' where m_id = ${m_id};`

    sql.query(UPDATE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.status(200).send(result)
    })
})

route.delete('/delete', (req, res) => {
    const { m_id } = req.query;
    
    if (!m_id) {
        return res.status(400).send(`Invalid Request`)
    }

    const DELETE_QUERY = `delete from Modules where m_id = ${m_id}`

    sql.query(DELETE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.status(200).send(result)
    })

})

route.get('/:id', (req, res) => {
    sql.query(`SELECT * FROM Modules WHERE m_id = '${req.params.id}'`, (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Query: ${err}`)
        }

        res.send(result)
    })
})

module.exports = route