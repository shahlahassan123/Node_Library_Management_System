const express = require('express');
const router = express.Router();
//BOOKS
let displayBooks = require('./Books/displayBooks');
let addBook = require('./Books/addBooks');
let editBook = require('./Books/editBooks');
let saveBook = require('./Books/saveBooks');
let saveAfterEdit = require('./Books/saveAfterEdit');
let deleteBook = require('./Books/deleteBooks');
let deleteBookAfterConfirm = require('./Books/deleteAfterConfirm');
//USERS
let displayBookUsers = require('./BookUsers/displayBookUsers');
let addBookUser = require('./BookUsers/addBookUser');
let saveBookUser = require('./BookUsers/saveBookUser');
let editBookUser = require('./BookUsers/editBookUser');
let saveAfterEditBookUser = require('./BookUsers/saveAfterEditBookUser');
let deleteBookUser = require('./BookUsers/deleteBookUser');
let deletebookUserAfterConfirm = require('./BookUsers/deleteBookUserAfterConfirm');
//ORDERS
let displayNewOrders = require('./NewOrders/displayNewOrders');
let addOrder = require('./NewOrders/addNewOrders');
let saveOrder = require('./NewOrders/saveOrders');
let editnewOrder = require('./NewOrders/editNewOrders');
let saveAfterEditNewOrder = require('./NewOrders/saveNewOrdersAfterEdit')
let deleteNewOrder = require('./NewOrders/deleteNewOrder');
let deleteAfterConfirmNewOrder = require('./NewOrders/deleteNewOrderAfterConfirm');

router.get('/', function(req, res, next) {
    res.redirect('/books');
  });

//BOOKS
// DISPLAY BOOK REQUESTS
router.get('/books',displayBooks);

//ADD BOOK REQUESTS
router.get('/books/add', addBook);
router.post('/books/add', saveBook);

//EDIT BOOK REQUESTS
router.get("/books/edit/:id", editBook);
router.post("/books/edit", saveAfterEdit);

//DELETE BOOK REQUESTS
router.get("/books/delete/:id", deleteBook);
router.post("/books/delete", deleteBookAfterConfirm)

//USERS
// DISPLAY USER REQUESTS
router.get('/bookUsers',displayBookUsers);

//ADD USER REQUESTS
router.get('/bookUsers/add', addBookUser);
router.post('/bookUsers/add', saveBookUser);

//EDIT USER REQUESTS
router.get("/bookUsers/edit/:id", editBookUser);
router.post("/bookUsers/edit", saveAfterEditBookUser);

//DELRE USER REQUESTS
router.get("/bookUsers/delete/:id", deleteBookUser);
router.post("/bookUsers/delete", deletebookUserAfterConfirm);

//ORDERS
// DISPLAY ORDERS REQUESTS
router.get('/newOrders',displayNewOrders);

//ADD ORDER REQUESTS
router.get('/newOrders/add', addOrder);
router.post('/newOrders/add', saveOrder);


//EDIT ORDERS REQUESTS
router.get("/newOrders/edit/:id", editnewOrder);
router.post("/newOrders/edit", saveAfterEditNewOrder);

//DELETE USER REQUESTS
router.get("/newOrders/delete/:id", deleteNewOrder);
router.post("/newOrders/delete", deleteAfterConfirmNewOrder);

module.exports = router;