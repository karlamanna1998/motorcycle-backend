const fs = require('fs')
const { google } = require('googleapis')
const brandModel = require('../../model/brandModel');


module.exports.addBrand = async (req, res) => {
    console.log(req.file, "asasa");
    const { brand_name } = req.body;
    try {
        const brandFound = await brandModel.findOne({ brand_name: { $regex: new RegExp(brand_name, 'i') } });

        if (brandFound) {
            return res.status(400).json({ message: "Brand already exists" });
        }

        async function uploadFile() {
            try {
                const GOOGLE_API_FOLDER_ID = "1HetS8ID63Qe3utA700u9j1pC4E9PD7TI"
                const auth = new google.auth.GoogleAuth({
                    keyFile: './auth.json',
                    scopes: ['https://www.googleapis.com/auth/drive']
                })

                const driveService = google.drive({
                    version: 'v3',
                    auth
                })

                const fileMetaData = {
                    'name': `${brand_name}.jpg`,
                    'parents': [GOOGLE_API_FOLDER_ID]
                }

                const media = {
                    mimeType: 'image/jpg',
                    body: fs.createReadStream(req.file.path),
                }

                const response = await driveService.files.create({
                    resource: fileMetaData,
                    media: media,
                    fields: 'id,webViewLink,webContentLink',
                })
                return response.data

            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Something went wrong in Uploading Image" });
            }
        }

        const uploadData = await uploadFile()
        fs.unlinkSync(req.file.path);
        if (uploadData) {
            const newBrandInsert = await brandModel.create({ brand_name: brand_name, logo_url: uploadData.webContentLink });
            if (newBrandInsert) {
                return res.status(201).json({ message: "Brand added successfully" });
            } else {
                return res.status(500).json({ message: "Something went wrong in inserting Data" });
            }
        } else {
            return res.status(500).json({ message: "Something went wrong in Uploading Image" });
        }

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.getBrand = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of items per page, default is 10
    const skip = (page - 1) * pageSize;
    const totalCount = await brandModel.countDocuments();
    try {
        const allBrand = await brandModel.aggregate([
            {
                $project: {
                    _id: 1,
                    brand_name: 1,
                    logo_url: 1,

                }

            },
            {
                $sort: {
                    brand_name: 1,
                }
            },
            {
                $skip: skip,
            },
            {
                $limit: pageSize,
            }
        ]);

        res.status(200).json({ message: "All brands fetched", data: allBrand, total_docs: totalCount });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};




module.exports.deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;

        const brandToDelete = await brandModel.findById(id);

        if (!brandToDelete) {
            return res.status(404).json({ message: "Brand not found" });
        }

        const deletedBrand = await brandModel.findByIdAndDelete(id);

        // Initialize Google Drive API
        const auth = new google.auth.GoogleAuth({
            keyFile: './auth.json',
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const driveService = google.drive({
            version: 'v3',
            auth,
        });

        // Extract the file ID from the logo_url
        const urlParams = new URLSearchParams(brandToDelete.logo_url)
        console.log(urlParams, "urllll");
        const fileId = urlParams.get('https://drive.google.com/uc?id')
        console.log(fileId, "iddddddddddd");

        // // Delete the file from Google Drive
        await driveService.files.delete({
            fileId,
        });

        if (deletedBrand) {
            return res.status(200).json({ message: "Brand deleted successfully" });
        }
    } catch (err) {
        console.log(err, "eerorr");
        return res.status(500).json({ message: err.message });
    }
}


module.exports.updateBrand = async (req, res) => {
    const { id } = req.params;
    const { brand_name } = req.body;

    try {
        const brandToUpdate = await brandModel.findById(id);

        console.log(brandToUpdate, "updated");

        if (!brandToUpdate) {
            return res.status(404).json({ message: "Brand not found" });
        }

        // Check if the brand name is already taken by another brand
        const existingBrand = await brandModel.findOne({
            _id: { $ne: id }, // Exclude the current brand from the search
            brand_name: { $regex: new RegExp(brand_name, 'i') }
        });

        if (existingBrand) {
            return res.status(400).json({ message: "Brand name is already taken" });
        }

        // Update brand name
        brandToUpdate.brand_name = brand_name;


        async function uploadFile() {
            try {
                const GOOGLE_API_FOLDER_ID = "1HetS8ID63Qe3utA700u9j1pC4E9PD7TI"
                const auth = new google.auth.GoogleAuth({
                    keyFile: './auth.json',
                    scopes: ['https://www.googleapis.com/auth/drive']
                })

                const driveService = google.drive({
                    version: 'v3',
                    auth
                })

                const fileMetaData = {
                    'name': `${brand_name}.jpg`,
                    'parents': [GOOGLE_API_FOLDER_ID]
                }

                const media = {
                    mimeType: 'image/jpg',
                    body: fs.createReadStream(req.file.path),
                }

                const response = await driveService.files.create({
                    resource: fileMetaData,
                    media: media,
                    fields: 'id,webViewLink,webContentLink',
                })
                return response.data

            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: "Something went wrong in Uploading Image" });
            }
        }

        // Update image URL if a new file is uploaded
        if (req.file) {
            // Delete the existing image file from Google Drive
            const auth = new google.auth.GoogleAuth({
                keyFile: './auth.json',
                scopes: ['https://www.googleapis.com/auth/drive'],
            });

            const driveService = google.drive({
                version: 'v3',
                auth,
            });

            // Extract the file ID from the logo_url
            const urlParams = new URLSearchParams(brandToUpdate.logo_url)
            console.log(urlParams, "urllll");
            const fileId = urlParams.get('https://drive.google.com/uc?id')
            console.log(fileId, "iddddddddddd");

            // // Delete the file from Google Drive
            await driveService.files.delete({
                fileId,
            });

            // Upload the new image file to Google Drive
            const updatedImageUrl = await uploadFile();
            brandToUpdate.logo_url = updatedImageUrl.webContentLink;

            // Remove the old local file
            fs.unlinkSync(req.file.path);
        }

        // Save the updated brand
        const updatedBrand = await brandToUpdate.save();

        res.status(200).json({ message: "Brand updated successfully", data: updatedBrand });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports.getAllBrandDropdown = async (req, res) => {
    try {
        const allBrand = await brandModel.aggregate([
            {
                $project: {
                    _id: 1,
                    brand_name: 1,
                }
            },
            {
                $sort: {
                    brand_name: 1,
                }
            },
        ]);
        res.status(200).json({ message: "All brands fetched", data: allBrand });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
