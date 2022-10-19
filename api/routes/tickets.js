const Tickets = require("../models/Tickets");
const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
const router = require("express").Router();



//ADD
router.post("/add", async (req, res) => {
  const cre = new Date();
  let nw = cre.getTime();
  const exp = new Date(nw + 900000) ;
    const newTicket = new Tickets({
      parkinglot:{ _id:req.body.plot._id,
                   slot_no:req.body.plot.slot},
      user: req.body.user,
      vehicle: req.body.v_no,
      reff_no: CryptoJS.AES.encrypt(
        req.body.seckey,
        process.env.PASS_SEC
      ).toString(),
      create_time: cre,
      expire_time: exp,
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
    if(!ticket)  res.status(401).json("Wrong credentials!");
    else{

      // console.log(ticket);
      const hashedPassword = CryptoJS.AES.decrypt(
        ticket.reff_no,
        process.env.PASS_SEC
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if(OriginalPassword !== req.body.seckey)  res.status(401).json("Wrong credentials!");
      // console.log(OriginalPassword);  
      else{

        const delticket = await Tickets.findOneAndDelete({vehicle:req.body.v_no, reff_no:ticket.reff_no});
        res.status(200).json(delticket);  
      }
      
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET

router.post("/view", async (req, res) => {
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
    res.status(200).json(ticket);  
    
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;