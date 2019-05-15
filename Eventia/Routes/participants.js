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

// route.get('/add', (req, res) => {
//     // syntax: http://localhost:5000/api/participant/add?p_name=Noor&p_num=03248235405&p_email=noor@gmail.com&m_id=5&t_id=5&is_leader=true&uni_id=5

//     if(!req.query.p_nic){
//         const { p_name, p_num, p_email, m_id, t_id, is_leader, uni_id} = req.query

//         var INSERT_QUERY = `INSERT INTO Participants(p_name, p_num, p_email, m_id, t_id, isLeader, uni_id)VALUES ('${p_name}', '${p_num}','${p_email}', ${m_id}, ${t_id}, ${is_leader}, ${uni_id} )`;
//     }

//     if(req.query.p_nic){
//         const { p_name, p_num, p_nic, p_email, m_id, t_id, is_leader, uni_id} = req.query

//         var INSERT_QUERY = `INSERT INTO Participants(p_name, p_num, p_email, m_id, t_id, isLeader, uni_id)VALUES ('${p_name}', '${p_num}', ${p_nic} , '${p_email}', ${m_id}, ${t_id}, ${is_leader}, ${uni_id} )`;
//     }

//     sql.query(INSERT_QUERY, (err, result) => {
//         if(err) {
//             return res.status(400).send(err)
//         }

//         return res.send(result)
//     })


// })

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


route.get('/:id', (req, res) => {
    sql.query(`SELECT * FROM Participants WHERE p_id = '${req.params.id}'`, (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Query: ${err}`)
        }

        res.send(result)
    })
})

module.exports = route