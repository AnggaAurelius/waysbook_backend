const { Book, Cart, PurchasedBook } = require("../../models");

exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll({
      where: {
        user: req.user.id,
      },
      include: {
        as: "book",
        model: Book,
        attributes: {
          exclude: [
            "ISBN",
            "password",
            "createdAt",
            "updatedAt",
            "pages",
            "description",
            "publicationDate",
            "bookAttachment",
          ],
        },
      },
      attributes: {
        exclude: ["bookId", "status", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        carts,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { id } = req.params;

    await Cart.findOne({
      where: {
        user: req.user.id,
        bookId: id,
      },
    });
    res.send({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Cart.findOne({
      where: {
        bookId,
        user: req.user.id,
      },
    });

    if (book)
      return res.send({
        status: "error",
        message: "book already added",
      });

    const checkProcess = await PurchasedBook.findOne({
      where: {
        user: req.user.id,
        bookId,
        status: "false",
      },
    });

    if (checkProcess)
      return res.send({
        status: "wait",
        message: "wait approve",
      });

    const carts = await Cart.create({
      user: req.user.id,
      bookId,
    });
    res.send({
      status: "success",
      data: {
        carts,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findOne({
      where: {
        id,
      },
    });

    if (!cart) {
      return res.send({
        message: `Cart with id ${id} Not Existed`,
      });
    }

    await Cart.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Cart with id ${id} deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Cart.destroy({
      where: {
        user: req.user.id,
      },
    });

    res.send({
      status: "success",
      message: `all cart delete`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
