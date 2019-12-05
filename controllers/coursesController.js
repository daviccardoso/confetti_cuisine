const Course = require('../models/course');

function getCourseParams(body) {
  return {
    title,
    description,
    maxStudents,
    cost
  } = body;
}

function index(req, res, next) {
  Course.find({})
    .then(courses => {
      res.locals.courses = courses;
      next();
    })
    .catch(error => {
      console.log(`Error fetching courses: ${error.message}`);
      next(error);
    });
}

function indexView(req, res) {
  res.render('courses/index');
}

function newCourse(req, res) {
  res.render('courses/new');
}

function create(req, res, next) {
  Course.create(getCourseParams(req.body))
    .then(course => {
      res.locals.redirect = `/courses/${course._id}`;
      next();
    })
    .catch(error => {
      console.log(`Error creating course: ${error.message}`);
      next(error);
    });
}

function edit(req, res, next) {
  const courseId = req.params.id;

  Course.findById(courseId)
    .then(course => res.render('courses/edit', { course }))
    .catch(error => {
      console.log(`Error fetching course by ID: ${error.message}`);
      next(error);
    });
}

function update(req, res, next) {
  const courseId = req.params.id;
  const courseData = getCourseParams(req.body);

  Course.findByIdAndUpdate(courseId, {
    $set: courseData
  })
    .then(() => {
      res.locals.redirect = `/courses/${courseId}`;
      next();
    })
    .catch(error => {
      console.log(`Error updating user by ID: ${error.message}`);
      next(error);
    });
}

function deleteCourse(req, res, next) {
  const courseId = req.params.id;

  Course.findByIdAndRemove(courseId)
    .then(() => {
      res.locals.redirect = '/courses';
      next();
    })
    .catch(error => {
      console.log(`Error deleting course by ID: ${error.message}`);
      next(error);
    });
};

function show(req, res, next) {
  courseId = req.params.id;

  Course.findById(courseId)
    .then(course => {
      res.locals.course = course;
      next();
    })
    .catch(error => {
      console.log(`Error fetching course: ${error.message}`);
      next(error);
    });
}

function showView(req, res) {
  res.render('courses/show');
}

function redirectView(req, res, next) {
  const redirectPath = res.locals.redirect;

  if (redirectPath) res.redirect(redirectPath);
  else next();
}

module.exports = {
  index,
  indexView,
  newCourse,
  create,
  edit,
  update,
  deleteCourse,
  show,
  showView,
  redirectView
};
