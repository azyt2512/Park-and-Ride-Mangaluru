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
     const avl = 135;
    try {
      const updatedPark = await Parkinglot.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            //  "fields.disponibilite":avl,
             "fields.grp_disponible":avl
          }
        }
      );
      console.log(updatedPark);
      res.status(200).json(updatedPark);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;