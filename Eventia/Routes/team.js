const express = require('express')
const sql = require('../db')

const route = express.Router()

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

    if (!t_id || !t_name || !uni_id || !m_id || !isPaid) {
        return res.status(400).send('Invalid Request')
    }

    const UPDATE_TEAM = `update Team set t_name = "${t_name}", m_id = ${m_id}, isPaid = ${isPaid} where t_id = ${t_id};`

    const UPDATE_PARTICIAPANTS = `update Participants set uni_id = ${uni_id}, m_id = ${m_id} where t_id = ${t_id};`

    sql.query(UPDATE_TEAM, (err, result) => {
        if (err) {
            return res.status(400).send('Invalid Request')
        }
    })

    sql.query(UPDATE_PARTICIAPANTS, (err, result) => {
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

module.exports = route
