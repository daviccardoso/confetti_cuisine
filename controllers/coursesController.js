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

function index(req, res) {
  res.render('courses', { offeredCourses });
}

module.exports = { index };