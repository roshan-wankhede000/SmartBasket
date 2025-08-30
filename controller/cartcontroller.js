const cart = require("../model/cart")
const product = require("../model/productmodel")


let addtocart = async (req, res) => {
    let id = req.params.id

    let p = await product.findById(id)
    let ct = await cart.find({ email: req.cookies.name, pid: id })
    if (ct.length == 0) {
        await cart.create({
            pid: p.id,
            name: p.name,
            image: p.image,
            finalprice: p.finalprice,
            quantity: 1,
            totalrice: p.finalprice,
            email: req.cookies.name
        })
    }
    else {
        let cid = ct[0]._id

        let c = await cart.findById(cid)

        let newquantity = c.quantity + 1

        if (newquantity < 11) {
            let newtotalprice = c.finalprice * newquantity
            await cart.findByIdAndUpdate(cid, { quantity: newquantity, totalrice: newtotalprice })
        }
    }
    res.redirect("/cart")

}

let carts = async (req, res) => {
    const result = await cart.aggregate([
        { $match: { email: req.cookies.name } },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$totalrice" }
            }
        }
    ]);

    const total = result.length > 0 ? result[0].totalAmount : 0;

    let c = await cart.find({ email: req.cookies.name });
    res.render("cart", { c: c, total: total });
};


let increase = async (req, res) => {
    let cid = req.params.id
    let c = await cart.findById(cid)

    let newquantity = c.quantity + 1

    if (newquantity < 11) {
        let newtotalprice = c.finalprice * newquantity

        await cart.findByIdAndUpdate(cid, { quantity: newquantity, totalrice: newtotalprice })


    }

    res.redirect("/cart")

}

let decrease = async (req, res) => {
    let cid = req.params.id
    let c = await cart.findById(cid)

    let newquantity = c.quantity - 1

    if (newquantity > 0) {
        let newtotalprice = c.finalprice * newquantity
        await cart.findByIdAndUpdate(cid, { quantity: newquantity, totalrice: newtotalprice })


    }

    res.redirect("/cart")

}

let deletecart = async (req, res) => {
    let cid = req.params.id

    await cart.findByIdAndDelete(cid)

    res.redirect("/cart")
}

module.exports = { addtocart, carts, increase, decrease, deletecart }