const express = require('express')
const sql = require('../db')

const route = express.Router()

route.get('/', (req, res) => {
    sql.query(`select * from TeamInfo`, (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Request: ${err}`)
        }
        return res.status(200).send(result);
    })
})

route.get('/uni', (req, res) => {
    const { t_id } = req.query

    console.log(t_id)

    sql.query('CALL Team_Info() ', (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Request: ${err}`)
        }

        return res.status(200).send(result)
    })
})

route.put('/modify', (req, res) => {

    const { t_id, t_name, uni_id, m_id, isPaid } = req.query

    console.log(t_id, t_name, uni_id, m_id, isPaid)

    if (!t_id || !t_name || !uni_id || !m_id || !isPaid) {
        return res.status(400).send('Invalid Request')
    }

    const UPDATE_QUERY = `update Team set t_name = "${t_name}", uni_id = ${uni_id}, m_id = ${m_id}, isPaid = ${isPaid} where t_id = ${t_id};`

    sql.query(UPDATE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }

        return res.status(200).send(result)
    })
})

route.delete('/delete', (req, res) => {
    
    const { t_id } = req.query;
    
    if (!t_id) {
        return res.status(400).send(`Invalid Request`)
    }

    const DELETE_QUERY = `delete from Team where t_id = ${t_id};`
    console.log(DELETE_QUERY);
    sql.query(DELETE_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.status(200).send(result)
    })

})

route.get('/add', (req, res) => {
    //syntax : http://localhost:5000/api/university/add?uni_name=iba&uni_campus=main
    const { t_id, is_paid } = req.query

    if (!t_id || !is_paid) {
        return res.status(400).send(`Invalid Request`)
    }

    const INSERT_QUERY = `INSERT INTO Team(isPaid)VALUES (${is_paid} WHERE t_id = ${t_id})`;
    sql.query(INSERT_QUERY, (err, result) => {
        if (err) {
            return res.status(400).send(err)
        }

        return res.send(result)
    })
})

route.get('/:id', (req, res) => {
    sql.query(`SELECT * FROM Team WHERE t_id = '${req.params.id}'`, (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Query: ${err}`)
        }

        res.send(result)
    })
})

module.exports = route