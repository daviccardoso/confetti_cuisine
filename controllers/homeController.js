const offeredCourses = [
  {
    title: 'Event Driven Cakes',
    cost: 50
  },
  {
    title: 'Asynchronous Artichoke',
    cost: 25
  },
  {
    title: 'Object Oriented Orange Juice',
    cost: 10
  }
];

function showCourses(req, res) {
  res.render('courses', { offeredCourses });
}

function postedSignUpForm(req, res) {
  res.render('thanks');
}

function showHome(req, res) {
  res.render('index');
}

module.exports = { showHome, showCourses, postedSignUpForm };
