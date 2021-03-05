const express = require("express");
const router = express.Router();
const { authenticated } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/checkRole");
const { uploadBook } = require("../middlewares/uploadBook");
const { uploadFile } = require("../middlewares/upload");
const { uploadFiles } = require("../middlewares/uploadFile");

const {
  getUsers,
  getUser,
  editUser,
  editPic,
} = require("../controllers/users");

const { register, login, checkAuth } = require("../controllers/auth");
const {
  getBooks,
  getBooksById,
  addBook,
  promo,
} = require("../controllers/books");
const {
  getCarts,
  getCart,
  addToCart,
  deleteCart,
  deleteAll,
} = require("../controllers/cart");
const {
  getSum,
  addSUm,
  editSum,
  deleteSum,
} = require("../controllers/sumItem");

const { addTransaction } = require("../controllers/addTransaction");
const {
  getTransactions,
  editTransaction,
} = require("../controllers/transactions");
const {
  approveBook,
  cancelBook,
  checkBook,
  getMyBook,
  theirBook,
} = require("../controllers/purchasedBook");

// auth
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", authenticated, checkAuth);

// users
router.get("/users", authenticated, isAdmin, getUsers);
router.get("/user", authenticated, getUser);
router.patch("/edit-user", authenticated, editUser);
router.patch("/edit-pic", uploadFiles("thumbnail"), authenticated, editPic);
// router.patch("/edit-pic", uploadFile("imageFile"), authenticated, editPic);

// cart
router.get("/cart", authenticated, getCarts);
router.get("/cart/:id", authenticated, getCart);
router.post("/addCart", authenticated, addToCart);
router.delete("/deleteCart/:id", authenticated, deleteCart);
router.delete("/deleteAll", authenticated, deleteAll);

// item
router.get("/getsum", authenticated, getSum);
router.post("/addsum", authenticated, addSUm);
router.patch("/editsum", authenticated, editSum);
router.delete("/clear", authenticated, deleteSum);

// books
router.get("/books", getBooks);
router.get("/promo", promo);
router.get("/book/:id", getBooksById);
router.post("/upload-book", uploadBook("thumbnail", "bookAttachment"), addBook);

// transaction
router.post(
  "/addTransaction",
  uploadFile("imageFile"),
  authenticated,
  addTransaction
);
router.get("/transactions", authenticated, isAdmin, getTransactions);
router.patch("/transaction/:id", authenticated, isAdmin, editTransaction);

// purchased book
router.get("/checkBook/:id", authenticated, checkBook);
router.get("/getMyBook", authenticated, getMyBook);
router.patch("/approveBook/:id", authenticated, approveBook);
router.patch("/cancelBook/:id", authenticated, cancelBook);
router.get("/theirBook/:id", authenticated, isAdmin, theirBook);

module.exports = router;
