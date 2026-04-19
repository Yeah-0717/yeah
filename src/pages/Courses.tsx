import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Courses: React.FC = () => {
  // 模拟课程数据
  const courses = [
    {
      id: 1,
      title: 'Python基础入门',
      description: '掌握Python编程基础，为数据分析打下坚实基础',
      category: 'Python基础',
      difficulty: '初级',
      duration: '10小时',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20basics%20course%20cover&image_size=square'
    },
    {
      id: 2,
      title: '数据可视化基础',
      description: '学习如何将数据转化为直观的图表和可视化',
      category: '数据可视化',
      difficulty: '初级',
      duration: '8小时',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20visualization%20basics%20course%20cover&image_size=square'
    },
    {
      id: 3,
      title: '商务数据分析方法',
      description: '应用数据分析技术解决商务问题',
      category: '商务数据分析',
      difficulty: '中级',
      duration: '12小时',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20analysis%20methods%20course%20cover&image_size=square'
    },
    {
      id: 4,
      title: 'Python数据分析实战',
      description: '学习使用Python进行实际数据分析项目',
      category: 'Python基础',
      difficulty: '中级',
      duration: '15小时',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20practice%20course%20cover&image_size=square'
    },
    {
      id: 5,
      title: '数据可视化高级技巧',
      description: '学习使用Matplotlib和Seaborn创建专业数据可视化',
      category: '数据可视化',
      difficulty: '中级',
      duration: '10小时',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20data%20visualization%20course%20cover&image_size=square'
    },
    {
      id: 6,
      title: '机器学习基础',
      description: '了解机器学习基础，应用于数据分析',
      category: '机器学习',
      difficulty: '高级',
      duration: '18小时',
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Machine%20learning%20basics%20course%20cover&image_size=square'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('全部');

  const categories = ['全部', 'Python基础', '数据可视化', '商务数据分析', '机器学习'];
  const difficulties = ['全部', '初级', '中级', '高级'];

  // 过滤课程
  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === '全部' || course.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === '全部' || course.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">课程列表</h1>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">课程分类</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">难度级别</label>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded">
                    {course.category}
                  </span>
                  <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded">
                    {course.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 text-sm">{course.duration}</span>
                </div>
                <Link to={`/courses/${course.id}`} className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                  查看课程
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;