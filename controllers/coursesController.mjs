import { asyncHandler } from '../middleware/asyncHandler.mjs';
import ErrorResponse from '../models/ErrorResponseModel.mjs';
import Course from '../models/CourseModel.mjs';

// @desc  Add a new course
// @route POST /api/v1/courses
// @access  PRIVATE
export const addCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({ success: true, statusCode: 201, data: course });
});

// @desc  Delete course
// @route DELETE /api/v1/courses/:id
// @access  PRIVATE
export const deleteCourse = asyncHandler(async (req, res, next) => {
  await Course.findByIdAndDelete(req.params.id);

  res.status(204).send();
});

// @desc  Get course by id
// @route GET /api/v1/courses/:id
// @access  PUBLIC
export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course)
    return next(
      new ErrorResponse(
        `We could not find a course with id: ${req.params.id}`,
        404
      )
    );

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: course,
  });
});

// @desc  Get all courses
// @route GET /api/v1/courses/
// @access  PUBLIC
export const getCourses = asyncHandler(async (req, res, next) => {
  let query;
  let queryString;
  let requestQuery = { ...req.query };
  const excludeFields = ['select', 'sort', 'page', 'pageSize'];

  excludeFields.forEach((field) => delete requestQuery[field]);

  queryString = JSON.stringify(requestQuery).replace(
    /\b(lt|lte|gt|gte|in)\b/g,
    (match) => `$${match}`
  );

  query = Course.find(JSON.parse(queryString));

  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }

  const pages = await Course.countDocuments(JSON.parse(queryString));
  const pageNo = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || pages;
  const page = (pageNo - 1) * pageSize;

  query = query.skip(page).limit(pageSize);

  const courses = await query;

  const pagination = {};

  console.log('PAGES', page * pageSize, pages);

  pagination.totalDocuments = pages;
  pagination.totalPages = Math.ceil(pages / pageSize);
  if (page * pageSize < pages && pageSize < pages) {
    pagination.next = {
      page: pageNo + 1,
      pageSize,
    };
  }

  if (page > 0) {
    pagination.prev = {
      page: pageNo - 1,
      pageSize,
    };
  }

  if (req.query.page) {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      items: courses.length,
      pagination,
      data: courses,
    });
  } else {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      items: courses.length,
      data: courses,
    });
  }
});

// @desc  Uppdate course
// @route PUT /api/v1/courses/:id
// @access  PRIVATE
export const updateCourse = asyncHandler(async (req, res, next) => {
  await Course.findByIdAndUpdate(req.params.id, req.body);
  res.status(204).send();
});
