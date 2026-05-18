const axios = require('axios');

// @desc    Get AI recommendations for employee
// @route   POST /api/ai/recommend
// @access  Private
const getRecommendations = async (req, res) => {
  try {
    const { employeeData } = req.body;
    
    if (!employeeData) {
      return res.status(400).json({ message: 'Employee data is required' });
    }

    const { name, department, skills, performanceScore, experience } = employeeData;

    // Build AI prompt based on employee data
    let prompt = `You are an HR analytics expert. Analyze the following employee data and provide recommendations:\n\n`;
    prompt += `Employee Name: ${name}\n`;
    prompt += `Department: ${department}\n`;
    prompt += `Skills: ${skills.join(', ')}\n`;
    prompt += `Performance Score: ${performanceScore}/100\n`;
    prompt += `Years of Experience: ${experience}\n\n`;
    
    prompt += `Please provide recommendations in the following JSON format:\n`;
    prompt += `{\n`;
    prompt += `  "promotionRecommendation": "Yes/No with reason",\n`;
    prompt += `  "trainingSuggestions": ["suggestion1", "suggestion2"],\n`;
    prompt += `  "skillEnhancement": ["skill1", "skill2"],\n`;
    prompt += `  "performanceFeedback": "detailed feedback",\n`;
    prompt += `  "careerPath": "recommended career path"\n`;
    prompt += `}\n\n`;
    
    prompt += `If performance score is above 85, recommend promotion. If below 50, suggest training. If skills are missing for the role, suggest skill enhancement.`;

    // Call OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an HR analytics expert. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    
    // Parse AI response
    let recommendations;
    try {
      // Try to extract JSON from response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recommendations = JSON.parse(jsonMatch[0]);
      } else {
        recommendations = JSON.parse(aiResponse);
      }
    } catch (parseError) {
      // Fallback to default recommendations if parsing fails
      recommendations = generateFallbackRecommendations(employeeData);
    }

    res.json(recommendations);
  } catch (error) {
    console.error('AI API Error:', error.message);
    
    // Fallback to rule-based recommendations if AI fails
    const { employeeData } = req.body;
    const fallbackRecommendations = generateFallbackRecommendations(employeeData);
    res.json(fallbackRecommendations);
  }
};

// Fallback rule-based recommendations
const generateFallbackRecommendations = (employeeData) => {
  const { performanceScore, skills, experience, department } = employeeData;
  
  const recommendations = {
    promotionRecommendation: '',
    trainingSuggestions: [],
    skillEnhancement: [],
    performanceFeedback: '',
    careerPath: '',
  };

  // Promotion recommendation
  if (performanceScore >= 85 && experience >= 3) {
    recommendations.promotionRecommendation = 'Yes - Excellent performance with sufficient experience';
  } else if (performanceScore >= 85 && experience < 3) {
    recommendations.promotionRecommendation = 'Consider - Excellent performance but needs more experience';
  } else {
    recommendations.promotionRecommendation = 'No - Performance needs improvement';
  }

  // Training suggestions
  if (performanceScore < 50) {
    recommendations.trainingSuggestions.push('Performance improvement training');
    recommendations.trainingSuggestions.push('Skill development workshops');
  } else if (performanceScore < 70) {
    recommendations.trainingSuggestions.push('Advanced skill training');
  }

  // Skill enhancement based on department
  const departmentSkills = {
    Engineering: ['React', 'Node.js', 'Python', 'Cloud Computing'],
    Marketing: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
    Sales: ['Negotiation', 'CRM', 'Communication', 'Product Knowledge'],
    HR: ['HR Analytics', 'Recruitment', 'Employee Relations', 'Compliance'],
    Finance: ['Financial Analysis', 'Excel', 'Accounting', 'Risk Management'],
    Operations: ['Process Optimization', 'Supply Chain', 'Project Management'],
    Design: ['UI/UX', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
  };

  const requiredSkills = departmentSkills[department] || [];
  const missingSkills = requiredSkills.filter(skill => !skills.includes(skill));
  recommendations.skillEnhancement = missingSkills.slice(0, 3);

  // Performance feedback
  if (performanceScore >= 85) {
    recommendations.performanceFeedback = 'Outstanding performance. Employee exceeds expectations consistently.';
  } else if (performanceScore >= 70) {
    recommendations.performanceFeedback = 'Good performance. Employee meets expectations well.';
  } else if (performanceScore >= 50) {
    recommendations.performanceFeedback = 'Average performance. Room for improvement in key areas.';
  } else {
    recommendations.performanceFeedback = 'Performance below expectations. Immediate attention required.';
  }

  // Career path
  const careerPaths = {
    Engineering: 'Senior Engineer -> Tech Lead -> Engineering Manager',
    Marketing: 'Marketing Specialist -> Marketing Manager -> CMO',
    Sales: 'Sales Representative -> Sales Manager -> Sales Director',
    HR: 'HR Specialist -> HR Manager -> HR Director',
    Finance: 'Financial Analyst -> Finance Manager -> CFO',
    Operations: 'Operations Specialist -> Operations Manager -> COO',
    Design: 'Junior Designer -> Senior Designer -> Design Lead',
  };
  recommendations.careerPath = careerPaths[department] || 'Specialist -> Senior Specialist -> Manager';

  return recommendations;
};

module.exports = { getRecommendations };
