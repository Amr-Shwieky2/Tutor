const express = require('express');

const {
  getTutors,
  getTutor,
  createTutor,
  updateTutor,
  deleteTutor,
  getTutorsInRadius,
  tutorPhotoUpload
} = require('../controllers/tutor');

const Tutor = require('../models/Tutor');

// Include other resource routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:tutorId/courses', courseRouter);
router.use('/:tutorId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getTutorsInRadius);

router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), tutorPhotoUpload);

router
  .route('/')
  .get(advancedResults(Tutor, 'courses'), getTutors)
  .post(protect, authorize('publisher', 'admin'), createTutor);

router
  .route('/:id')
  .get(getTutor)
  .put(protect, authorize('publisher', 'admin'), updateTutor)
  .delete(protect, authorize('publisher', 'admin'), deleteTutor);

module.exports = router;
