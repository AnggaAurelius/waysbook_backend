const {
  User,
  Transaction,
  sumItem,
  Cart,
  PurchasedBook,
} = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    //   const cart = await Cart.findAll({
    //   where: {
    //     user: req.user.id,
    //   },
    // });
    // const sum = await sumItem.findOne({
    //   where: {
    //     user: req.user.id,
    //   },
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt"],
    //   },
    // });
    console.log(req.files);
    const newTransaction = await Transaction.create({
      userId: req.user.id,
      payment: req.files.thumbnail[0].path,
      sum: 10000000,
      // // payment: "Pending",
      // createdAt: "2017-01-01",
      // updatedAt: "2019-01-11",
    });
    console.log(req.files.thumbnail[0].path);
    // const transaction = await Transaction.findOne({
    //   where: {
    //     attachment: newTransaction.attachment,
    //   },
    //   include: {
    //     as: "user",
    //     model: User,
    //     attributes: {
    //       exclude: [
    //         "password",
    //         "createdAt",
    //         "updatedAt",
    //         "phone",
    //         "address",
    //         "role",
    //       ],
    //     },
    //   },
    //   attributes: {
    //     exclude: ["userId", "createdAt", "updatedAt"],
    //   },
    // });
    // var x = 0;
    // const length = cart.length;
    // while (x < length) {
    //   await PurchasedBook.create({
    //     bookId: cart[x].bookId,
    //     transaction: transaction.id,
    //     user: req.user.id,
    //     status: "false",
    //   });
    //   x++;
    // }

    res.send({
      data: {
        newTransaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
