const fs = require('fs')
const { google } = require('googleapis')
const mototcycleModel = require('../../model/mototcycleModel');
const mongoose = require('mongoose');
const { json } = require('body-parser');


module.exports.addMototrcycle = async (req, res) => {
    var { motorcycle_name, brand } = req.body;
    try {
        const mototcycleFound = await mototcycleModel.findOne({ motorcycle_name: { $regex: new RegExp(motorcycle_name, 'i') }, brand: new mongoose.Types.ObjectId(brand) });

        if (mototcycleFound) {
            return res.status(400).json({ message: "Motorcycle already exists" });
        }

        async function uploadFile(file) {
            try {
                const GOOGLE_API_FOLDER_ID = "1UUcU_i8L247bhDwe5UGWin_v3QIHIY9w"
                const auth = new google.auth.GoogleAuth({
                    keyFile: './auth.json',
                    scopes: ['https://www.googleapis.com/auth/drive']
                })

                const driveService = google.drive({
                    version: 'v3',
                    auth
                })

                const fileMetaData = {
                    'name': `${file.originalname.split(".")[0]}.jpg`,
                    'parents': [GOOGLE_API_FOLDER_ID]
                }

                const media = {
                    mimeType: 'image/jpg',
                    body: fs.createReadStream(file.path),
                }

                const response = await driveService.files.create({
                    resource: fileMetaData,
                    media: media,
                    fields: 'id,webViewLink,webContentLink',
                })
                return response.data

            } catch (err) {
                console.log(err)
                return res.status(500).json({ message: "Something went wrong in Uploading Image here" });
            }
        }

        if(!req.files?.display_image){
            return res.status(500).json({ message: "Display Image not found" });
        }

        const displayImage = req.files?.display_image[0];
        // const images = req.files?.images;

       

        const displayImageUploaded = await uploadFile(displayImage)
        fs.unlinkSync(displayImage.path);
        if (!displayImageUploaded) {
            return res.status(500).json({ message: "Something went wrong in Uploading Image" });
        }

        // const imagesUrl = []


        // if (images) {
        //     for (image of images) {
        //         const imageUploaded = await uploadFile(image)
        //         fs.unlinkSync(image.path);
        //         if (imageUploaded) {
        //             imagesUrl.push(imageUploaded.webContentLink)
        //         } else {
        //             return res.status(500).json({ message: "Something went wrong in Uploading Image" });
        //         }
        //     }
        // }

        const newMotorcycleInsert = await mototcycleModel.create({
            motorcycle_name: motorcycle_name,
            brand: new mongoose.Types.ObjectId(brand),
            display_image_url: displayImageUploaded.webContentLink,
            // images_url: imagesUrl
        });

        if (newMotorcycleInsert) {
            return res.status(201).json({ message: "Motorcycle added successfully" });
        } else {
            return res.status(500).json({ message: "Something went wrong in inserting Data" });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getAllMotorcycle = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page, default is 10
    const skip = (page - 1) * pageSize;
    const totalCount = await mototcycleModel.countDocuments();
    try {
        const allmotorycles = await mototcycleModel.aggregate([
            {
                $project: {
                    _id: 1,
                    motorcycle_name: 1,
                    display_image_url: 1,
                    brand : 1
                }
            },
            {
                $sort: {
                    motorcycle_name: 1,
                }
            },
            {
                $skip: skip,
            },
            {
                $limit: pageSize,
            }
        ]);

        res.status(200).json({ message: "All motorcycles fetched", data: allmotorycles, total_docs: totalCount });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports.deleteMototcycle = async (req, res) => {
    // try{
    //      const {id} = req.params;

    //       const deletedBrand = await brandModel.findByIdAndDelete(id);

    //       if(deletedBrand){
    //         return res.status(200).json({ message: "Brand deleted successfully" });
    //       }
    // }catch (err) {
    //     return res.status(500).json({ message: err.message });
    // }
}
