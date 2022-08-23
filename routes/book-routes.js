const { json } = require('express');
const express = require('express')
const router = express.Router();
const Book=require('../model/Book')
const bookController = require('../controllers/books-controller')
router.get('/', bookController.hello)
router.get('/allBooks', bookController.getAllBooks)
router.get('/addBook',bookController.get_addBook)
router.post('/addBook',bookController.post_addBook)
router.get('/details/:id',bookController.getById)
router.put('/:id',bookController.updataBook)
router.delete('/:id',bookController.deleteBook)
module.exports = router