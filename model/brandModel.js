const mongoose = require('mongoose');

const brandScheema = new mongoose.Schema({
    brand_name : {
        type: String,
        required: true
    },
    logo_url : {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('brands', brandScheema);