const fs = require('fs')
const { google } = require('googleapis')
const variantsModel = require('../../model/variantsModel');
const mongoose = require('mongoose');
const { json } = require('body-parser');


module.exports.addVariants = async (req, res) => {
    var { motorcycle, brand, variant_name } = req.body;
    try {
        const variantFound = await variantsModel.findOne({ motorcycle: motorcycle, brand: new mongoose.Types.ObjectId(brand), variant_name :  { $regex: new RegExp(variant_name, 'i') } });

        if (variantFound) {
            return res.status(400).json({ message: "Variant already exists" });
        }

        const newVariantInsert = await variantsModel.create({
            variant_name : variant_name,
            motorcycle: new mongoose.Types.ObjectId(motorcycle),
            brand: new mongoose.Types.ObjectId(brand),
            features : req.body.features,
            specifications : req.body.specifications,
            price : req.body.price
        });

        if (newVariantInsert) {
            return res.status(201).json({ message: "Variant added successfully" });
        } else {
            return res.status(500).json({ message: "Something went wrong in inserting Data" });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports.getAllVariantsList = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page, default is 10
    const skip = (page - 1) * pageSize;
    const totalCount = await variantsModel.countDocuments();
    try {
        const allVariants = await variantsModel.aggregate([
            {
                $lookup : {
                    from : 'motorcycles',
                    localField : 'motorcycle',
                    foreignField : '_id',
                    as : 'motorcycle_data'
                }
            },
            {
                $lookup: {
                    from: 'brands', // Replace with the actual name of your brands collection
                    localField: 'brand',
                    foreignField: '_id',
                    as: 'brand_data'
                }
            },{
                $unwind : '$brand_data'
            },{
                $unwind : '$motorcycle_data'
            },{
                $project : {
                    _id : 1,
                    brand_name : '$brand_data.brand_name',
                    motorcycle_name : '$motorcycle_data.motorcycle_name',
                    price : 1,
                    variant_name: 1,
                    display_image : '$motorcycle_data.display_image_url'
                }
            },
            {
                $sort: {
                    variant_name: 1,
                }
            },
            {
                $skip: skip,
            },
            {
                $limit: pageSize,
            }
        ])

        res.status(200).json({ message: "All Variants fetched", data: allVariants, total_docs: totalCount });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};