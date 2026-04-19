import React from 'react';

const InstructorDashboard: React.FC = () => {
  // 模拟课程数据
  const courses = [
    {
      id: 1,
      title: 'Python基础入门',
      description: '掌握Python编程基础，为数据分析打下坚实基础',
      students: 120,
      status: '活跃'
    },
    {
      id: 2,
      title: '数据可视化基础',
      description: '学习如何将数据转化为直观的图表和可视化',
      students: 85,
      status: '活跃'
    },
    {
      id: 3,
      title: '商务数据分析方法',
      description: '应用数据分析技术解决商务问题',
      students: 60,
      status: '草稿'
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">教师仪表板</h1>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">我的课程</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            创建新课程
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  课程名称
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  描述
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  学生数
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{course.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{course.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.students}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${course.status === '活跃' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      编辑
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">学生进度</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">
              学生进度统计和分析功能正在开发中...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;