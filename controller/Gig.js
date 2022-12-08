const express = require('express')
const Gig = require('../models/Gig')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// get all gigs

const getAllGigs = async (req, res) => {
    try {
        const gigs = await Gig.findAll({ raw: true })
        res.render('gigs', {
            gigs
        })
    } catch (error) {
        console.error(error)
    }
}

// Get  Add gig form

const addGigForm = async (req, res) => {
    try {
        res.render('add')
    } catch (error) {
        console.error(error)
    }
}

// Get  Add gig

const addGig = async (req, res) => {
    let { title, description, technologies, budget, contact_email } = req.body
    let errors = []
    if (!title) {
        errors.push({ text: "please add title" })
    }
    if (!description) {
        errors.push({ text: "please add description" })
    }
    if (!technologies) {
        errors.push({ text: "please add technologies" })
    }
    if (!contact_email) {
        errors.push({ text: "please add contact_email" })
    }
    if (errors.length > 0) {
        res.render('add', {
            errors,
            title,
            description,
            budget,
            contact_email
        })
    } else {
        if (!budget) {
            budget = 'Unknown'
        } else {
            budget = `$${budget}`
        }

        // lower case and remove spaces

        technologies = technologies.toLowerCase().replace(/, /g, ',')
        try {
            const response = await Gig.create({
                title,
                description,
                technologies,
                budget,
                contact_email
            })
            if (response) {
                res.redirect('/gigs')
            }
        } catch (error) {
            console.error(error)
        }
    }
}

//  search gigs 

const searchGigs = async (req, res) => {
    let { term } = req.query
    // lowercase
    term = term.toLowerCase()
    try {
        const gigs = await Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } }, raw: true })
        if (gigs) {
            res.render('gigs', {
                gigs
            })
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getAllGigs, addGig, addGigForm, searchGigs }