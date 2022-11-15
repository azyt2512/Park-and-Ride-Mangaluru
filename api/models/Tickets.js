const mongoose = require("mongoose");

    const TicketSchema = new mongoose.Schema(
        { 
            parkinglot:{
            _id:{type:String, isRequired:true},
            slot_no:{type:Number, isRequired:true}
            }, 
            user:{
                type:String,
                isRequired:true,
            },
            vehicle:{
                type:String,
                isRequired:true,
            },
            vehicle_type:{
                type:String,
                isRequired:true,
            },
            reff_no:{
                type:String,
                isRequired:true,
            },
            create_time:{
                type:Date,
                isRequired:true,
            },
            expire_time:{
                type:Date,
                isRequired:true,
            }
        },
        
    );

module.exports = mongoose.model("ticket", TicketSchema);

