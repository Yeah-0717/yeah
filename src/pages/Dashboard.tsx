import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // 模拟用户学习进度数据
  const userProgress = {
    totalCourses: 12,
    completedCourses: 3,
    inProgressCourses: 2,
    totalHours: 15.5,
    recentActivities: [
      { id: 1, course: 'Python基础入门', activity: '完成了第3章练习', time: '今天 14:30' },
      { id: 2, course: '数据可视化基础', activity: '开始学习第2章', time: '昨天 16:45' },
      { id: 3, course: 'Python基础入门', activity: '完成了第2章测评', time: '3天前' }
    ]
  };

  // 模拟推荐课程数据
  const recommendedCourses = [
    {
      id: 1,
      title: 'Python数据分析实战',
      description: '学习使用Python进行实际数据分析项目',
      progress: 0,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20course%20cover&image_size=square'
    },
    {
      id: 2,
      title: '商务数据分析方法',
      description: '掌握商务场景下的数据分析方法和技巧',
      progress: 0,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20analysis%20course%20cover&image_size=square'
    },
    {
      id: 3,
      title: '数据可视化高级技巧',
      description: '学习使用Matplotlib和Seaborn创建专业数据可视化',
      progress: 0,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20visualization%20course%20cover&image_size=square'
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">个人仪表板</h1>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 mb-2">总课程数</div>
            <div className="text-3xl font-bold">{userProgress.totalCourses}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 mb-2">已完成课程</div>
            <div className="text-3xl font-bold text-green-600">{userProgress.completedCourses}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 mb-2">进行中课程</div>
            <div className="text-3xl font-bold text-blue-600">{userProgress.inProgressCourses}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 mb-2">学习时长</div>
            <div className="text-3xl font-bold">{userProgress.totalHours} 小时</div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">最近活动</h2>
          <div className="space-y-4">
            {userProgress.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 border-b border-gray-100">
                <div className="bg-blue-100 rounded-full p-2 mr-4">
                  <span className="text-blue-600">📚</span>
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{activity.course}</div>
                  <div className="text-gray-500 text-sm">{activity.activity}</div>
                </div>
                <div className="text-gray-400 text-sm">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div>
          <h2 className="text-xl font-semibold mb-4">推荐课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">进度: {course.progress}%</div>
                  <Link to={`/courses/${course.id}`} className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                    开始学习
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;