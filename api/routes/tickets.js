const Tickets = require("../models/Tickets");
const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
const router = require("express").Router();



//ADD
router.post("/add", async (req, res) => {
    const newTicket = new Tickets({
      parkinglot: req.body.p_id,
      user: req.body.user,
      vehicle: req.body.v_no,
      reff_no: CryptoJS.AES.encrypt(
        req.body.seckey,
        process.env.PASS_SEC
      ).toString(),
    });
  
    try {
      const savedTicket = await newTicket.save();
      res.status(200).json(savedTicket);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

//CHECKOUT

router.delete("/checkout", async (req, res) => {
  // console.log(req.body);
  try {
    const ticket = await Tickets.findOne({ vehicle: req.body.v_no });
    !ticket && res.status(401).json("Wrong credentials!");

    // console.log(ticket);
    const hashedPassword = CryptoJS.AES.decrypt(
      ticket.reff_no,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.seckey && res.status(401).json("Wrong credentials!");
    // console.log(OriginalPassword);  
    
    const delticket = await Tickets.findOneAndDelete({vehicle:req.body.v_no, reff_no:ticket.reff_no});
    res.status(200).json(delticket);  
    
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;