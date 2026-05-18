import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Brain, 
  Plus,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentEmployees, setRecentEmployees] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analyticsRes, employeesRes] = await Promise.all([
        api.get('/employees/analytics'),
        api.get('/employees'),
      ]);

      setStats(analyticsRes.data);
      setRecentEmployees(employeesRes.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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

  const statCards = [
    {
      title: 'Total Employees',
      value: stats?.totalEmployees || 0,
      icon: Users,
      color: 'bg-blue-500',
      link: '/employees',
    },
    {
      title: 'Average Performance',
      value: `${stats?.averagePerformance || 0}%`,
      icon: TrendingUp,
      color: 'bg-green-500',
      link: '/analytics',
    },
    {
      title: 'Top Performers',
      value: stats?.performanceStats?.excellent || 0,
      icon: Award,
      color: 'bg-purple-500',
      link: '/employees',
    },
    {
      title: 'AI Recommendations',
      value: 'Active',
      icon: Brain,
      color: 'bg-orange-500',
      link: '/ai-recommendations',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome to HR Analytics Dashboard
          </p>
        </div>
        <Link
          to="/employees/add"
          className="btn-primary flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Employee</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="card hover:scale-105 transition-transform duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Department Distribution */}
      {stats?.departmentCounts && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Department Distribution
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.departmentCounts).map(([dept, count]) => (
              <div
                key={dept}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-center"
              >
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {count}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{dept}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Employees */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Employees
          </h2>
          <Link
            to="/employees"
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center space-x-1"
          >
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentEmployees.map((employee) => (
            <div
              key={employee._id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {employee.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {employee.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {employee.department}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {employee.performanceScore}%
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Performance
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Stats */}
      {stats?.performanceStats && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Performance Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.performanceStats.excellent}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Excellent</p>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.performanceStats.good}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Good</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.performanceStats.average}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.performanceStats.poor}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Poor</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
