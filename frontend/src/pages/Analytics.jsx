import { useState, useEffect } from 'react';
import api from '../utils/axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4'];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, employeesRes] = await Promise.all([
        api.get('/employees/analytics'),
        api.get('/employees'),
      ]);
      setAnalytics(analyticsRes.data);
      setEmployees(employeesRes.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Prepare department data for pie chart
  const departmentData = analytics?.departmentCounts
    ? Object.entries(analytics.departmentCounts).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  // Prepare performance data for bar chart
  const performanceData = analytics?.performanceStats
    ? [
        { name: 'Excellent', value: analytics.performanceStats.excellent },
        { name: 'Good', value: analytics.performanceStats.good },
        { name: 'Average', value: analytics.performanceStats.average },
        { name: 'Poor', value: analytics.performanceStats.poor },
      ]
    : [];

  // Prepare top performers data
  const topPerformers = [...employees]
    .sort((a, b) => b.performanceScore - a.performanceScore)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Employee performance insights and statistics
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Total Employees
          </h3>
          <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
            {analytics?.totalEmployees || 0}
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Average Performance
          </h3>
          <p className="text-4xl font-bold text-green-600 dark:text-green-400">
            {analytics?.averagePerformance || 0}%
          </p>
        </div>
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Top Performers
          </h3>
          <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
            {analytics?.performanceStats?.excellent || 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Department Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Performance Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers Table */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Top 10 Performers
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Rank
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Department
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Performance Score
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Experience
                </th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((employee, index) => (
                <tr
                  key={employee._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 rounded-full font-semibold">
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                    {employee.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {employee.department}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {employee.performanceScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {employee.experience} years
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance by Department */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Average Performance by Department
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(analytics?.departmentCounts || {}).map(([dept, count]) => {
            const deptEmployees = employees.filter((e) => e.department === dept);
            const avgScore =
              deptEmployees.length > 0
                ? deptEmployees.reduce((sum, e) => sum + e.performanceScore, 0) / deptEmployees.length
                : 0;
            return (
              <div key={dept} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">{dept}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Employees:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Score:</span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    {avgScore.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${avgScore}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
