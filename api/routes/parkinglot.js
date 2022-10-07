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

//UPDATE

router.put("/:id",  async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;