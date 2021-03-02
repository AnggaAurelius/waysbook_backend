const { PurchasedBook, Book } = require("../../models");

exports.approveBook = async (req, res) => {
  try {
    const { id } = req.params;

    await PurchasedBook.update(req.body, {
      where: {
        transaction: id,
      },
    });

    const Updated = await PurchasedBook.findOne({
      where: {
        transaction: id,
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        purchasedBook: Updated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.cancelBook = async (req, res) => {
  try {
    const { id } = req.params;

    await PurchasedBook.update(req.body, {
      where: {
        transaction: id,
      },
    });

    const Updated = await PurchasedBook.findOne({
      where: {
        transaction: id,
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        purchasedBook: Updated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.checkBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await PurchasedBook.findAll({
      where: {
        user: req.user.id,
        bookId: id,
        status: "true",
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
            "title",
            "author",
            "id",
            "price",
            "thumbnail",
          ],
        },
      },
    });
    if (!book) {
      res.send({
        status: "not found",
      });
    }
    res.send({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.getMyBook = async (req, res) => {
  try {
    const book = await PurchasedBook.findAll({
      where: {
        user: req.user.id,
        status: "true",
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
          ],
        },
      },
      attributes: {
        exclude: [
          "user",
          "transaction",
          "createdAt",
          "updatedAt",
          "status",
          "bookId",
        ],
      },
    });
    res.send({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.theirBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await PurchasedBook.findAll({
      where: {
        transaction: id,
      },
      include: {
        as: "book",
        model: Book,
        attributes: {
          exclude: [
            "ISBN",
            "createdAt",
            "updatedAt",
            "pages",
            "description",
            "publicationDate",
            "id",
            "bookAttachment",
          ],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!book) {
      res.send({
        status: "not found",
      });
    }
    res.send({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
