import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  // 模拟课程分类数据
  const courseCategories = [
    {
      id: 1,
      name: 'Python基础',
      icon: '🐍',
      courseCount: 12,
      description: '掌握Python编程基础，为数据分析打下坚实基础'
    },
    {
      id: 2,
      name: '数据可视化',
      icon: '📊',
      courseCount: 8,
      description: '学习如何将数据转化为直观的图表和可视化'
    },
    {
      id: 3,
      name: '商务数据分析',
      icon: '💼',
      courseCount: 15,
      description: '应用数据分析技术解决商务问题'
    },
    {
      id: 4,
      name: '机器学习',
      icon: '🤖',
      courseCount: 10,
      description: '了解机器学习基础，应用于数据分析'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              基于Python的数据分析在线教育平台
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              为商务数据分析与应用专业的学生提供完整的学习体系、互动式学习模块和成就激励系统
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg">
                浏览课程
              </Link>
              <Link to="/register" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg">
                立即注册
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">课程分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">{category.courseCount} 课程</span>
                  <Link to="/courses" className="text-blue-600 hover:text-blue-800 font-medium">
                    查看课程 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">平台特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">完整的课程体系</h3>
              <p className="text-gray-600">
                从Python基础到高级数据分析，为商务数据分析专业学生提供系统化的课程内容
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">互动式学习模块</h3>
              <p className="text-gray-600">
                包含实时代码编辑器、练习和测评，提供沉浸式学习体验
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 text-amber-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">成就激励系统</h3>
              <p className="text-gray-600">
                通过徽章、证书和进度跟踪，激励学生持续学习和进步
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">开始你的数据分析学习之旅</h2>
          <p className="text-xl mb-8">
            注册账号，立即访问完整的课程体系和互动式学习模块
          </p>
          <Link to="/register" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg inline-block">
            立即注册
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;