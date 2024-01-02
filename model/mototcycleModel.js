const mongoose = require('mongoose');

const mototcycleScheema = new mongoose.Schema({
    motorcycle_name : {
        type: String,
        required: true
    },
    brand : {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    display_image_url : {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    // images_url : {
    //     type: Array,
    //     default: []
    // },
},{
    timestamps: true
})

module.exports = mongoose.model('motorcycles', mototcycleScheema);