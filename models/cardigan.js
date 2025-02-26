const {v4: uuid} = require('uuid');

const cardigans = [
    {
        id: '1',
        title: "Classic Knit",
        seller: "Creative Cardigans",
        condition: "New",
        price: 45,
        details: "A timeless classic knit cardigan.",
        image: "/images/ClassicKnit.jpg",
        active: true
    },
    {
        id: '2',
        title: "Elegant Wool",
        seller: "Creative Cardigans",
        condition: "New",
        price: 55,
        details: "Elegant wool cardigan for a sophisticated look.",
        image: "/images/ElegantWool.jpg",
        active: true
    },
    {
        id: '3',
        title: "Casual Comfort",
        seller: "Creative Cardigans",
        condition: "New",
        price: 40,
        details: "A cozy and comfortable everyday cardigan.",
        image: "/images/CasualComfort.jpg",
        active: true
    },
    {
        id: '4',
        title: "Embroidery Wool",
        seller: "Creative Cardigans",
        condition: "New",
        price: 50,
        details: "Stylish embroidered wool cardigan.",
        image: "/images/EmbroideryWool.jpg",
        active: true
    },
    {
        id: '5',
        title: "Cozy Fleece",
        seller: "Creative Cardigans",
        condition: "New",
        price: 60,
        details: "Warm and soft fleece cardigan.",
        image: "/images/CozyFleece.jpg",
        active: true
    },
    {
        id: '6',
        title: "Color Block",
        seller: "Creative Cardigans",
        condition: "New",
        price: 65,
        details: "Trendy color-blocked cardigan.",
        image: "/images/ColorBlock.jpg",
        active: true
    }
];

// Return all cardigans
exports.findAll = () => cardigans.sort((a, b) => a.price - b.price);

// Find a cardigan by ID
exports.findById = (id) => {
    return cardigans.find(item => item.id === id || item.id === Number(id));
};

exports.save = function (cardigan) {
    cardigan.id = uuid();
    cardigans.push(cardigan);
};

// Update a cardigan by ID
exports.updateById = (id, updatedData) => {
    let index = cardigans.findIndex(item => item.id === id || item.id === Number(id));
    if (index !== -1) {
        cardigans[index] = { ...cardigans[index], ...updatedData, id }; // Prevent ID from changing
        return true;
    }
    return false;
};

// Delete a cardigan by ID
exports.deleteById = (id) => {
    let index = cardigans.findIndex(item => item.id === id || item.id === Number(id));
    if (index !== -1) {
        cardigans.splice(index, 1);
        return true;
    }
    return false;
}
