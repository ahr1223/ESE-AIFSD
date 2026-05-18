import { useState, useEffect } from 'react';
import api from '../utils/axios';
import { Brain, Sparkles, AlertCircle, CheckCircle, TrendingUp, BookOpen } from 'lucide-react';

const AIRecommendations = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const generateRecommendations = async () => {
    if (!selectedEmployee) return;

    setGenerating(true);
    try {
      const response = await api.post('/ai/recommend', {
        employeeData: selectedEmployee,
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      alert('Failed to generate recommendations');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <Brain className="text-primary-600" />
          <span>AI Recommendations</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Get AI-powered insights for employee performance and career development
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Selection */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Select Employee
          </h2>
          <div className="space-y-3">
            {employees.map((employee) => (
              <button
                key={employee._id}
                onClick={() => {
                  setSelectedEmployee(employee);
                  setRecommendations(null);
                }}
                className={`w-full p-4 rounded-lg text-left transition-colors ${
                  selectedEmployee?._id === employee._id
                    ? 'bg-primary-100 border-2 border-primary-500 dark:bg-primary-900 dark:border-primary-400'
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {employee.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {employee.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary-600 dark:text-primary-400">
                      {employee.performanceScore}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Score
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedEmployee && (
            <button
              onClick={generateRecommendations}
              disabled={generating}
              className="w-full mt-4 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles size={20} />
              <span>{generating ? 'Generating...' : 'Generate Recommendations'}</span>
            </button>
          )}
        </div>

        {/* Recommendations Display */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            AI Insights
          </h2>

          {!selectedEmployee ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <Brain size={48} className="mb-4 opacity-50" />
              <p>Select an employee to generate recommendations</p>
            </div>
          ) : !recommendations ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <Sparkles size={48} className="mb-4 opacity-50" />
              <p>Click "Generate Recommendations" to get AI insights</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              {/* Promotion Recommendation */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp size={20} className="text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">
                    Promotion Recommendation
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {recommendations.promotionRecommendation}
                </p>
              </div>

              {/* Performance Feedback */}
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                  <h3 className="font-semibold text-green-900 dark:text-green-300">
                    Performance Feedback
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {recommendations.performanceFeedback}
                </p>
              </div>

              {/* Training Suggestions */}
              {recommendations.trainingSuggestions && recommendations.trainingSuggestions.length > 0 && (
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen size={20} className="text-purple-600 dark:text-purple-400" />
                    <h3 className="font-semibold text-purple-900 dark:text-purple-300">
                      Training Suggestions
                    </h3>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    {recommendations.trainingSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skill Enhancement */}
              {recommendations.skillEnhancement && recommendations.skillEnhancement.length > 0 && (
                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles size={20} className="text-orange-600 dark:text-orange-400" />
                    <h3 className="font-semibold text-orange-900 dark:text-orange-300">
                      Skill Enhancement
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recommendations.skillEnhancement.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Path */}
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Recommended Career Path
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {recommendations.careerPath}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
