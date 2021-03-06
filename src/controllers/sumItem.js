const { sumItem, Cart } = require("../../models");

exports.getSum = async (req, res) => {
  try {
    const sum = await sumItem.findOne({
      where: {
        user: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!sum) {
      return res.send({
        message: `Cart is empty`,
      });
    }

    res.send({
      status: "success",
      data: {
        sum,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.addSUm = async (req, res) => {
  try {
    const { qty, pay } = req.body;

    const sum = await sumItem.create({
      user: req.user.id,
      qty,
      pay,
    });
    res.send({
      status: "success",
      data: {
        sum,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.editSum = async (req, res) => {
  try {
    await sumItem.update(req.body, {
      where: {
        user: req.user.id,
      },
    });

    const updated = await sumItem.findOne({
      where: {
        user: req.user.id,
      },
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "password"],
      },
    });
    res.send({
      status: "success",
      data: {
        updated,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};

exports.deleteSum = async (req, res) => {
  try {
    await sumItem.destroy({
      where: {
        user: req.user.id,
      },
    });

    res.send({
      status: "success",
      message: `Cart with deleted`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Server Error",
    });
  }
};
