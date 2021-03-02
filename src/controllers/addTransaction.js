const {
  User,
  Transaction,
  sumItem,
  Cart,
  PurchasedBook,
} = require("../../models");

exports.addTransaction = async (req, res) => {
  const cart = await Cart.findAll({
    where: {
      user: req.user.id,
    },
  });
  try {
    const sum = await sumItem.findOne({
      where: {
        user: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    const newTransaction = await Transaction.create({
      userId: req.user.id,
      attachment: req.files.imageFile[0].filename,
      sum: sum.pay,
      payment: "Pending",
    });

    const transaction = await Transaction.findOne({
      where: {
        attachment: newTransaction.attachment,
      },
      include: {
        as: "user",
        model: User,
        attributes: {
          exclude: [
            "password",
            "createdAt",
            "updatedAt",
            "phone",
            "address",
            "role",
          ],
        },
      },
      attributes: {
        exclude: ["userId", "createdAt", "updatedAt"],
      },
    });
    var x = 0;
    const length = cart.length;
    while (x < length) {
      await PurchasedBook.create({
        bookId: cart[x].bookId,
        transaction: transaction.id,
        user: req.user.id,
        status: "false",
      });
      x++;
    }

    res.send({
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
