const validateEmployee = (req, res, next) => {
  const { name, email, department, skills, performanceScore, experience } = req.body;

  if (!name || !email || !department || performanceScore === undefined || experience === undefined) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  if (performanceScore < 0 || performanceScore > 100) {
    return res.status(400).json({ message: 'Performance score must be between 0 and 100' });
  }

  if (experience < 0) {
    return res.status(400).json({ message: 'Experience cannot be negative' });
  }

  next();
};

const validateUser = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  next();
};

module.exports = { validateEmployee, validateUser };
