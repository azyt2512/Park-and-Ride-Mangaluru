const mongoose = require("mongoose");

const ParkingSchema = new mongoose.Schema(
    {
        datasetid: {
            type: String
        },
        recordid: {
            type: String
        },
        Fields: {
        
                grp_complet: {
                    type: Number
                },
                grp_identifiant: {
                    type: String,
                    
                },
                disponibilite: {
                    type: Number
                },
                grp_nom: {
                    type: String
                },
                location: [{
                    type: Number
                }],
                grp_statut: {
                    type: Number
                },
                idobj: {
                    type: String,
                },
                grp_exploitation: {
                    type: Number
                },
                grp_horodatage: {
                    type: String,
                },
                grp_disponible: {
                    type: Number
                }   
        },
        Geometry: {
                type: {
                    type: String
                },
                coordinates: [{
                    type: Number,
                } ] 
        },
        record_timestamp: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("parkingLot", ParkingSchema);

