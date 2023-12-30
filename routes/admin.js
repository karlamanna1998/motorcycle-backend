// admin.js
const express = require('express');
const router = express.Router();
require("express-router-group")
const multer = require('multer');
const brandController = require('../controllers/admin/brandController');
const motorcycleController = require('../controllers/admin/motorcycleController');
// Set up storage for multe
const upload = multer({ dest: '/uploads' });

router.group('/brand', (router) => {
    router.post('/add-brand',  upload.single('file'), brandController.addBrand);
    router.get('/get-brand', brandController.getBrand);
    router.get('/get-all-brand-dropdown', brandController.getAllBrandDropdown);
    router.delete('/delete-brand/:id', brandController.deleteBrand);
    router.put('/update-brand/:id',  upload.single('file'), brandController.updateBrand);
});

router.group('/motorcycle', (router) => {
    router.post('/add-motorcycle',upload.fields([{ name: 'display_image', maxCount: 1 }]), motorcycleController.addMototrcycle);
    router.get('/get-motorcycle', motorcycleController.getAllMotorcycle);
});

// , { name: 'images', maxCount: 5 }
module.exports = router;
