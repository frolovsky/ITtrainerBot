const router = require('express').Router();
const questionsService = require('./questions.service');
const {
  BadRequestError
} = require('../../common/error.classes');

const getQuestionLang = (body) => body ? body.lang : 'ru';

router.route('/').get(async (req, res, next) => {
  try {
    const questions = await questionsService.getAll(getQuestionLang(req.body));
    res.json(questions);
  } catch (e) {
    return next(new BadRequestError());
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const question = await questionsService.create(getQuestionLang(req.body), req.body);
    res.json(question);
  } catch (e) {
    return next(new BadRequestError());
  }
});

module.exports = router;
