const Employee = require('../models/Employee');

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private
const createEmployee = async (req, res) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;

    // Check if employee exists
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      skills: skills || [],
      performanceScore,
      experience,
    });

    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ performanceScore: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search employees
// @route   GET /api/employees/search
// @access  Private
const searchEmployees = async (req, res) => {
  try {
    const { department, minScore, maxScore } = req.query;
    let query = {};

    if (department) {
      query.department = department;
    }

    if (minScore || maxScore) {
      query.performanceScore = {};
      if (minScore) query.performanceScore.$gte = parseFloat(minScore);
      if (maxScore) query.performanceScore.$lte = parseFloat(maxScore);
    }

    const employees = await Employee.find(query).sort({ performanceScore: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      employee.name = req.body.name || employee.name;
      employee.email = req.body.email || employee.email;
      employee.department = req.body.department || employee.department;
      employee.skills = req.body.skills || employee.skills;
      employee.performanceScore = req.body.performanceScore !== undefined ? req.body.performanceScore : employee.performanceScore;
      employee.experience = req.body.experience !== undefined ? req.body.experience : employee.experience;

      const updatedEmployee = await employee.save();
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await employee.deleteOne();
      res.json({ message: 'Employee removed' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get employee analytics
// @route   GET /api/employees/analytics
// @access  Private
const getAnalytics = async (req, res) => {
  try {
    const employees = await Employee.find({});
    
    const departmentCounts = {};
    const performanceStats = {
      excellent: 0,
      good: 0,
      average: 0,
      poor: 0,
    };
    
    employees.forEach(emp => {
      // Department counts
      departmentCounts[emp.department] = (departmentCounts[emp.department] || 0) + 1;
      
      // Performance stats
      if (emp.performanceScore >= 85) performanceStats.excellent++;
      else if (emp.performanceScore >= 70) performanceStats.good++;
      else if (emp.performanceScore >= 50) performanceStats.average++;
      else performanceStats.poor++;
    });

    const avgPerformance = employees.length > 0 
      ? employees.reduce((sum, emp) => sum + emp.performanceScore, 0) / employees.length 
      : 0;

    res.json({
      totalEmployees: employees.length,
      departmentCounts,
      performanceStats,
      averagePerformance: avgPerformance.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  searchEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getAnalytics,
};
