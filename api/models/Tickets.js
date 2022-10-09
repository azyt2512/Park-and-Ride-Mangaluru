const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
    { 
        parkinglot:{
           type:String,
           isRequired:true,
        }, 
        user:{
            type:String,
            isRequired:true,
        },
        vehicle:{
            type:String,
            isRequired:true,
        },
        reff_no:{
            type:String,
            isRequired:true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ticket", TicketSchema);

