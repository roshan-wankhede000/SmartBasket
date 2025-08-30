let order = require("../model/orders")
const cart = require("../model/cart")
let profile = require("../model/profile")
const puppeteer = require('puppeteer')
const nodemailer = require("nodemailer");
const ejs = require('ejs')
const path = require('path')

let checkout1 = async(req,res)=>{
    let ct = await cart.find({email:req.cookies.name})
    const orders = [];
    ct.forEach(async e =>  {
      const newOrder = await order.create({
            pname:e.name,price:e.price,quantity:e.quantity,totalPrice:e.totalrice,email:e.email
        })
        orders.push(newOrder);
    });


    const pro = await profile.find({email:req.cookies.email});

    const totalPrice = orders.reduce((sum, o) => sum + o.totalPrice, 0);


    const html = await ejs.renderFile(
      path.join(__dirname, "../views/bill.ejs"),
      { orders, pro, totalPrice }
    );

    // Generate PDF from HTML using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfPath = path.join(__dirname, "../invoices", `invoice-${Date.now()}.pdf`);
    await page.pdf({ path: pdfPath, format: "A4" });

    await browser.close();
   
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "carts195@gmail.com",
        pass: "rico fpfm wbfk etur ",
      },
    });
    
    // Wrap in an async IIFE so we can use await.
    (async () => {
      const info = await transporter.sendMail({
        from: '<carts195@gmail.com>',
        to: `${req.cookies.email}`,
        subject: "Order confirmation",
        text: "Hello world?", // plain‑text body
        html: "<b>Hello world?</b>", // HTML body
        attachments: [
          {
            filename: "invoice.pdf",
            path: pdfPath,
          },
        ],
      });
    })();

    res.render("placeOrder")

}

let invoiceHandler = async(req,res)=>{
  let n = req.cookies.name
  let totalPrice = 0

  let c = await cart.find({email:n})  
  let or = await order.find({email:n}).sort({ createdAt: -1 }).limit(c.length);

  or.forEach(e=>{
    totalPrice+=e.totalPrice
  })

  let pro = await profile.find({email:req.cookies.email})
  await cart.deleteMany({email:n})

  res.render("bill",{orders:or, pro:pro,totalPrice:totalPrice})
}



module.exports = {checkout1,invoiceHandler}