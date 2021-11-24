const router = require('express').Router();
const multer = require('multer');
const service = require('./narrow-thematic.service');
const {
  BadRequestError
} = require('../../common/error.classes');
const upload = multer({ dest: 'uploads/' });

router.route('/').get(async (req, res, next) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (e) {
    return next(new BadRequestError());
  }
});

router.route('/').post(upload.array('images'), async (req, res, next) => {
  try {
    const data = await service.create(req.files, req.body);
    res.json(data);
  } catch (e) {
    return next(new BadRequestError());
  }
});

module.exports = router;
