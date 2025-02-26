const express = require('express');
const controller = require('../controllers/cardiganController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

const router = express.Router();

router.get('/', controller.index);
router.get('/new', controller.newForm);
router.post('/', upload.single('image'), controller.create); // Handle file upload on create
router.get('/:id', controller.show);
router.get('/:id/edit', controller.editForm);
router.put('/:id', upload.single('image'), controller.update); // Handle file upload on edit
router.delete('/:id', controller.delete);

module.exports = router;
