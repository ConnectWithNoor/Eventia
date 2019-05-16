const express = require('express')
const sql = require('../db')

const route = express.Router()

route.get('/', (req, res) => {

    const { t_name } = req.query
    const { uni_id } = req.query
    const { m_id } = req.query
    const { leader_name, leader_contact, leader_email } = req.query
    const { member1_name, member1_contact, member1_email } = req.query
    const { member2_name, member2_contact, member2_email } = req.query

    if (!t_name || !uni_id || !m_id || !leader_name || !leader_contact || !leader_email) {
        return res.status(400).send(`Please Input all Values`)
    }

    const INSERT_INTO_TEAM = `INSERT INTO Team (t_name, uni_id, m_id) VALUES ('${t_name}', ${uni_id}, ${m_id})`

    // Adding Team Name to get the TeamID
    sql.query(INSERT_INTO_TEAM, (err, result) => {
        if (err) {
            return res.status(400).send(`Invalid Team Info: ${err}`)
        }

        return res.status(200).send('Team Created')
    });
    // // /*
    // //     Getting the ID of Team, to allocate with individual participant 
    // // */

    var t_id;

    function getIDs() {
        return new Promise((resolve, reject) => {

            sql.query(`SELECT t_id FROM Team WHERE t_name='${t_name}' AND m_id=${m_id} AND uni_id = ${uni_id}`, (err, result) => {
                t_id = result[0].t_id

            })
            setTimeout(() => {
                resolve()
            }, (1000));
        })
    }

    getIDs().then(async (res) => {

        // Inserting Leader of the Group

        INSERT_LEADER = `INSERT INTO Participants (p_name, p_num, p_email, m_id, t_id, isLeader, uni_id) VALUES ('${leader_name}', '${leader_contact}', '${leader_email}', ${m_id}, ${t_id}, true, ${uni_id})`

        await sql.query(INSERT_LEADER, (err, result) => {
            if (err) {
                console.log(`leader error`)
                return res.status(400).send(`Invalid Query: ${err}`)
            }
            console.log('Leader Added')
        });

        //Participants To Add

        {
            member1_name
                &&
                sql.query(`INSERT INTO Participants (p_name, p_num, p_email, m_id, t_id, isLeader, uni_id) VALUES ('${member1_name}', '${member1_contact}', '${member1_email}', ${m_id}, ${t_id}, false, ${uni_id})`, (err, result) => {
                    if (err) {
                        console.log(`member 1 error`)
                        return res.status(400).send(`Invalid Query: ${err}`)
                    }
                    console.log('Participant 1 Added')
                })
        }

        {
            member2_name
                &&
                sql.query(`INSERT INTO Participants (p_name, p_num, p_email, m_id, t_id, isLeader, uni_id) VALUES ('${member2_name}', '${member2_contact}', '${member2_email}', ${m_id}, ${t_id}, false, ${uni_id})`, (err, result) => {
                    if (err) {
                        console.log(`member 2 error`)
                        return res.status(400).send(`Invalid Query: ${err}`)
                    }
                    console.log('Participant 2 Added')
                })
        }
    }).catch(err => console.log(err))
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
