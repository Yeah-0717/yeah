import React from 'react';

const Achievements: React.FC = () => {
  // 模拟用户成就数据
  const userAchievements = {
    totalCourses: 12,
    completedCourses: 3,
    inProgressCourses: 2,
    totalHours: 15.5,
    badges: [
      {
        id: 1,
        name: 'Python初学者',
        description: '完成Python基础入门课程',
        earned: true,
        icon: '🐍'
      },
      {
        id: 2,
        name: '数据可视化师',
        description: '完成数据可视化基础课程',
        earned: true,
        icon: '📊'
      },
      {
        id: 3,
        name: '商务分析师',
        description: '完成商务数据分析方法课程',
        earned: false,
        icon: '💼'
      },
      {
        id: 4,
        name: '机器学习入门',
        description: '完成机器学习基础课程',
        earned: false,
        icon: '🤖'
      },
      {
        id: 5,
        name: '学习达人',
        description: '累计学习时间超过20小时',
        earned: false,
        icon: '🏆'
      },
      {
        id: 6,
        name: '练习大师',
        description: '完成50个以上的练习',
        earned: false,
        icon: '🎯'
      }
    ],
    certificates: [
      {
        id: 1,
        title: 'Python基础入门',
        issuedDate: '2026-04-01',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20basic%20certificate&image_size=landscape_16_9'
      },
      {
        id: 2,
        title: '数据可视化基础',
        issuedDate: '2026-04-10',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20visualization%20certificate&image_size=landscape_16_9'
      }
    ]
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">我的成就</h1>

        {/* Progress Overview */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">学习进度</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{userAchievements.completedCourses}/{userAchievements.totalCourses}</div>
              <div className="text-gray-500">已完成课程</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{userAchievements.inProgressCourses}</div>
              <div className="text-gray-500">进行中课程</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{userAchievements.totalHours}h</div>
              <div className="text-gray-500">学习时长</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {Math.round((userAchievements.completedCourses / userAchievements.totalCourses) * 100)}%
              </div>
              <div className="text-gray-500">总体进度</div>
            </div>
          </div>
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full" 
                style={{ width: `${(userAchievements.completedCourses / userAchievements.totalCourses) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">徽章</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {userAchievements.badges.map((badge) => (
              <div key={badge.id} className={`rounded-lg p-4 text-center ${badge.earned ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className={`text-4xl mb-2 ${badge.earned ? 'text-blue-600' : 'text-gray-300'}`}>
                  {badge.icon}
                </div>
                <h3 className={`font-medium mb-1 ${badge.earned ? 'text-gray-900' : 'text-gray-400'}`}>
                  {badge.name}
                </h3>
                <p className={`text-xs ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">证书</h2>
          <div className="space-y-6">
            {userAchievements.certificates.map((certificate) => (
              <div key={certificate.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img src={certificate.image} alt={certificate.title} className="w-full h-48 object-cover" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-lg font-semibold mb-2">{certificate.title}</h3>
                    <p className="text-gray-600 mb-4">颁发日期: {certificate.issuedDate}</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                      下载证书
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;