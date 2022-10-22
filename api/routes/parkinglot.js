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
     const avl = req.body.val - 1;
     const id = req.body.id;
    try {
      const updatedPark = await Parkinglot.findOneAndUpdate(
        {_id:id},
        {$set:{
          "fields.grp_disponible":avl
        }}
      );
      // console.log(updatedPark);
      res.status(200).json(updatedPark);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;