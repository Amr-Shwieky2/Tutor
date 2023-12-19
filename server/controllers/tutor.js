const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const Tutor = require('../models/Tutor');

// @desc      Get all tutors
// @route     GET /api/v1/tutors
// @access    Public
exports.getTutors = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single Tutor
// @route     GET /api/v1/Tutors/:id
// @access    Public
exports.getTutor = asyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findById(req.params.id);

  if (!tutor) {
    return next(
      new ErrorResponse(`Tutor not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: tutor });
});

// @desc      Create new tutor
// @route     POST /api/v1/tutors
// @access    Private
exports.createTutor = asyncHandler(async (req, res, next) => {
  // Add user to req,body
  req.body.user = req.user.id;

  // Check for published tutor
  const publishedTutor = await Tutor.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one tutor
  if (publishedTutor && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} has already published a tutor`,
        400
      )
    );
  }

  const tutor = await Tutor.create(req.body);

  res.status(201).json({
    success: true,
    data: tutor
  });
});

// @desc      Update tut
// @route     PUT /api/v1/tutors/:id
// @access    Private
exports.updateTutor = asyncHandler(async (req, res, next) => {
  let tut = await Tutor.findById(req.params.id);

  if (!tut) {
    return next(
      new ErrorResponse(`Tutor not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is tut owner
  if (tut.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this tut`,
        401
      )
    );
  }

  tut = await Tutor.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: tut });
});

// @desc      Delete tut
// @route     DELETE /api/v1/tutors/:id
// @access    Private
exports.deleteTutor = asyncHandler(async (req, res, next) => {
  const tut = await Tutor.findById(req.params.id);

  if (!tut) {
    return next(
      new ErrorResponse(`Tutor not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is tut owner
  if (tut.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this tut`,
        401
      )
    );
  }

  tut.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc      Get tutors within a radius
// @route     GET /api/v1/tutors/radius/:zipcode/:distance
// @access    Private
exports.getTutorsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const tutors = await Tutor.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  });

  res.status(200).json({
    success: true,
    count: tutors.length,
    data: tutors
  });
});

// @desc      Upload photo for tut
// @route     PUT /api/v1/tutors/:id/photo
// @access    Private
exports.tutorPhotoUpload = asyncHandler(async (req, res, next) => {
  const tut = await Tutor.findById(req.params.id);

  if (!tut) {
    return next(
      new ErrorResponse(`Tutor not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is tutor owner
  if (tut.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this tutor`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${tut._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Tutor.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  });
});
