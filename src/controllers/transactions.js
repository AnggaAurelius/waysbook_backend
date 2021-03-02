const { User, Book, Transaction, PurchasedBook } = require("../../models");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: {
        as: "user",
        model: User,
        attributes: {
          exclude: ["email", "password", "createdAt", "updatedAt", "role"],
        },
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: {
        id,
      },
    });

    if (!transaction) {
      return res.send({
        message: `Transaction with id ${id} Not Existed`,
      });
    }

    await Transaction.update(req.body, {
      where: {
        id,
      },
    });

    const transactionUpdated = await Transaction.findOne({
      where: {
        id,
      },

      include: {
        as: "user",
        model: User,
        attributes: {
          exclude: ["email", "password", "createdAt", "updatedAt", "role"],
        },
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        transaction: transactionUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
