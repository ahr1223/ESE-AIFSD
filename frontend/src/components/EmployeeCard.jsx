import { Edit, Trash2, Award, Briefcase } from 'lucide-react';
import { useState } from 'react';

const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const getPerformanceColor = (score) => {
    if (score >= 85) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    if (score >= 70) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  const getPerformanceLabel = (score) => {
    if (score >= 85) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Average';
    return 'Poor';
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setIsDeleting(true);
      await onDelete(employee._id);
      setIsDeleting(false);
    }
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {employee.name[0].toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPerformanceColor(employee.performanceScore)}`}>
          {getPerformanceLabel(employee.performanceScore)}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Briefcase size={16} />
          <span>{employee.department}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Award size={16} />
          <span>{employee.experience} years experience</span>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Performance Score</span>
            <span className="font-semibold text-gray-900 dark:text-white">{employee.performanceScore}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${employee.performanceScore}%` }}
            />
          </div>
        </div>

        {employee.skills && employee.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {employee.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onEdit(employee)}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-400"
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400 disabled:opacity-50"
        >
          <Trash2 size={16} />
          <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
