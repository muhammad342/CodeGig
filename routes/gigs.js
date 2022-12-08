const express = require('express')
const { getAllGigs, addGig, addGigForm, searchGigs } = require('../controller/Gig')

const router = express.Router()

router.get('/', getAllGigs)
router.get('/add', addGigForm)
router.post('/add', addGig)
router.get('/search', searchGigs)


module.exports = router