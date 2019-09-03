const router = require('express').Router();
let Word = require('../models/words.model');

router.route('/').get((req, res) => {
    Word.find()
        .then(words => res.json(words))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;