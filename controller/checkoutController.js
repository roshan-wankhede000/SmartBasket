const cart = require("../model/cart")
let profile = require('../model/profile')
let checkout = async (req, res) => {
  const result = await cart.aggregate([
    { $match: { email: req.cookies.name } },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$totalrice" }
      }
    }
  ]);

  const total = result[0].totalAmount;
  let c = await cart.find({ email: req.cookies.name })
  let d = await profile.find({ firstName: req.cookies.name })   
    res.render("checkout", { c: c, total: total, d: d })
}
module.exports = { checkout }