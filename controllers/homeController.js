exports.showCourses = (req, res) => {
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

  res.render('courses', { title: 'Courses', offeredCourses });
};
exports.postedSignUpForm = (req, res) => res.render('thanks', { title: 'Thanks!' });
exports.showHome = (req, res) => res.render('index', { title: 'Home' });
