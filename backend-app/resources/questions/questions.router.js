const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { readFileSync } = require('fs');
const questionsService = require('./questions.service');
const {
  BadRequestError
} = require('../../common/error.classes');

const getQuestionLang = (body) => body ? body.lang : 'ru';
const upload = multer({ dest: 'uploads/' });

router.route('/').get(async (req, res, next) => {
  try {
    const questions = await questionsService.getAll(getQuestionLang(req.body));
    res.json(questions);
  } catch (e) {
    return next(new BadRequestError());
  }
});

router.route('/').post(upload.array('images'), async (req, res, next) => {
  try {
    const images = req.files.map(file => ({
      data: readFileSync(path.join(__dirname + '../../../uploads/' + file.filename)),
      contentType: file.mimetype,
    }));
    const question = await questionsService.create(getQuestionLang(req.body), {
      ...req.body,
      images,
    });
    res.json(question);
  } catch (e) {
    return next(new BadRequestError());
  }
});

module.exports = router;
