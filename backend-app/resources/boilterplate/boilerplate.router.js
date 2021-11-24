const router = require('express').Router();
const path = require('path');
const multer = require('multer');
const { readFileSync } = require('fs');
const boilerplateService = require('./boilerplate.service');
const {
  BadRequestError
} = require('../../common/error.classes');
const upload = multer({ dest: 'uploads/' });

router.route('/').get(async (req, res, next) => {
  try {
    res.json([]);
  } catch (e) {
    return next(new BadRequestError());
  }
});

router.route('/').post(upload.array('images'), async (req, res, next) => {
  try {
    const images = req.files && req.files.length ? req.files.map(file => ({
      data: readFileSync(path.join(__dirname + '../../../uploads/' + file.filename)),
      contentType: file.mimetype,
    })) : [];
    res.json({
      images, ...req.body
    });
  } catch (e) {
    return next(new BadRequestError());
  }
});

module.exports = router;
