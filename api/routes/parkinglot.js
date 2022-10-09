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

router.patch("/:id",  async (req, res) => {
     const avl = 135;
    try {
      const updatedPark = await Parkinglot.updateOne(
        {_id:req.params.id},
        {
          // fields: {
          //   $dec:{
          //     disponibilite:1,
          //     grp_disponible:1
          //   }
          // }
           $set:{"fields.disponibilite":avl,
                  "fields.grp_disponible":avl}
        }
      );
      // console.log(updatedPark);
      res.status(200).json(updatedPark);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;