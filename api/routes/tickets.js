const Tickets = require("../models/Tickets");
const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
const router = require("express").Router();

const verifyVehicle = async (req, res, next) => {
  try {
      // console.log(req.body);
      let vehicle = await Tickets.findOne({ vehicle: req.body.v_no })
      if(vehicle){
          let curr_time = new Date();
          if(curr_time > vehicle.expire_time)
           { await Tickets.findOneAndDelete({ vehicle: req.body.v_no })
             next();}
          else
            res.status(401).json("Already registered")
      }
      else{
        next();
      }
  } catch (error) {
    res.status(500).json(err);
  }
}

//ADD
router.post("/add", verifyVehicle, async (req, res) => {
  try {
      const cre = new Date();
      const curr_ticks = await Tickets.aggregate([
        { $match: { expire_time: { $gte: cre },
                    "parkinglot._id":req.body.plot._id
      } },
        
      ]);
      // console.log(curr_ticks)
      let slots = new Array;
      for(let tick in curr_ticks) {
        // if(tick.expire_time > cre)
        slots.push(curr_ticks[tick].parkinglot.slot_no);
      } 
      // console.log(slots);
      slots.sort();
      let slot_alloting = 1;
      for(s in slots){
         if(slots[s] == slot_alloting)
         slot_alloting += 1;
         else 
         break;
      }
      let nw = cre.getTime();
      const exp = new Date(nw + 900000) ;
        const newTicket = new Tickets({
          parkinglot:{ _id:req.body.plot._id,
                       slot_no:slot_alloting},
          user: req.body.user,
          vehicle_type: req.body.v_type,
          vehicle: req.body.v_no,
          reff_no: CryptoJS.AES.encrypt(
            req.body.seckey,
            process.env.PASS_SEC
          ).toString(),
          create_time: cre,
          expire_time: exp,
        });
      
      const savedTicket = await newTicket.save();
      res.status(200).json(savedTicket);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

//CHECKOUT

router.post("/checkout", async (req, res) => {
  // console.log(req.body);
  try {
    const ticket = await Tickets.findOne({ vehicle: req.body.v_no });
    if(!ticket)  res.status(401).json("Wrong credential!");
    else{
      let curr_time = new Date();
      if(curr_time > ticket.expire_time)
      { await Tickets.findOneAndDelete({ vehicle: req.body.v_no })
        res.status(401).json('Wrong credentials!');
      }
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
    if(!ticket)  res.status(401).json("Wrong credentials!");
    else{
      let curr_time = new Date();
      if(curr_time > ticket.expire_time)
      { await Tickets.findOneAndDelete({ vehicle: req.body.v_no })
        res.status(401).json('Wrong credentials!');
      }
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
          res.status(200).json(ticket);  
        }
        
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;