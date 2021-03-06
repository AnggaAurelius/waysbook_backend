const { User, PurchasedBook, Book } = require("../../models");

//
// get user
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

//
// get user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "password"],
      },
    });
    // const purchasedBooks = await PurchasedBook.findAll({
    //   where: {
    //     user: req.user.id,
    //     status: "true",
    //   },
    //   attributes: {
    //     exclude: [
    //       "id",
    //       "createdAt",
    //       "updatedAt",
    //       "bookId",
    //       "transaction",
    //       "user",
    //       "status",
    //     ],
    //   },
    //   include: {
    //     as: "book",
    //     model: Book,
    //     attributes: {
    //       exclude: ["createdAt", "updatedAt", "role"],
    //     },
    //   },
    // });
    res.send({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error user",
    });
  }
};

//
// edit user
exports.editUser = async (req, res) => {
  try {
    const { gender, phone, address, role } = req.body;
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    await user.update({
      gender,
      phone,
      address,
      role,
    });

    const userUpdated = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "password"],
      },
    });
    res.send({
      status: "success",
      data: {
        userUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editPic = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    await user.update({
      avatar: req.files.thumbnail[0].path,
    });

    const userUpdated = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "password"],
      },
    });
    res.send({
      status: "success",
      data: {
        userUpdated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error pic",
    });
  }
};
