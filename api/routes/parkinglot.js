const Parkinglot = require("../models/Parkinglot");

const router = require("express").Router();

//GET ALL

router.get("/", async (req, res) => {
    try {
        const parkings = await Parkinglot.find();
        // console.log(parkings);
        res.status(200).json(parkings);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ONE

router.get("/getone/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const parkings = await Parkinglot.findById(_id);
        // console.log(parkings);
        res.status(200).json(parkings);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE

router.post("/uavail",  async (req, res) => {
     const avl = req.body.val;
     const id = req.body.id;
    try {
      const updatedPark = await Parkinglot.findOne({ _id: req.body.id });
      if(updatedPark){
        updatedPark.fields.grp_disponible = avl;
        updatedPark.save();
        res.status(200).json(updatedPark);
      }
      else{
        res.status(404).json("Awwwww!!!!!");
      }
      // console.log(updatedPark);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;