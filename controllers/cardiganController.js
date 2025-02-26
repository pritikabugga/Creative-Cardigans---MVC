const model = require('../models/cardigan');

exports.index = (req, res) => {
    let searchTerm = req.query.search ? req.query.search.toLowerCase() : "";
    let allCardigans = model.findAll();

    let filteredCardigans = allCardigans.filter(cardigan =>
        cardigan.title.toLowerCase().includes(searchTerm) ||
        cardigan.details.toLowerCase().includes(searchTerm)
    );

    res.render('./items/index', { 
        cardigans: filteredCardigans,
        searchTerm: req.query.search || ""
    });
};


exports.show = (req, res) => {
    let cardigan = model.findById(req.params.id);
    if (cardigan) {
        res.render('./items/show', { cardigan });
    } else {
        res.status(404).render('error', { error: { status: 404, message: "Item not found." } });
    }
};

exports.newForm = (req, res) => {
    res.render('./items/new');
};

exports.create = (req, res) => {
    let imageUrl = req.file ? `/images/${req.file.filename}` : "/images/default.jpg"; // Set uploaded image or default
    let cardigan = {
        title: req.body.title,
        seller: req.body.seller,
        condition: req.body.condition,
        price: parseFloat(req.body.price), // Ensure price is a number
        details: req.body.details,
        image: imageUrl,
        active: true
    };

    model.save(cardigan);
    res.redirect('/items');
};

exports.editForm = (req, res) => {
    let cardigan = model.findById(req.params.id);
    if (cardigan) {
        res.render('./items/edit', { cardigan });
    } else {
        res.status(404).render('error', { error: { status: 404, message: "Item not found." } });
    }
};

exports.update = (req, res, next) => {
    let id = req.params.id;
    
    // Check if an image was uploaded; if not, keep the existing image
    let updatedCardigan = {
        title: req.body.title,
        price: parseFloat(req.body.price),
        condition: req.body.condition,
        details: req.body.details,
        image: req.file ? "/images/" + req.file.filename : req.body.existingImage, // Keep existing image if no new one
    };

    if (model.updateById(id, updatedCardigan)) {
        res.redirect('/items/' + id);
    } else {
        let err = new Error('Cannot find a cardigan with id ' + id);
        err.status = 404;
        next(err);
    }
};


exports.delete = (req, res, next) => {
    let id = req.params.id;
    if (model.deleteById(id)) {
        res.redirect('/items');
    } else {
        let err = new Error('Cannot find cardigan with ID ' + id);
        err.status = 404;
        next(err);
    }
};


