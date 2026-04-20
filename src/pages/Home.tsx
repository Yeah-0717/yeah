import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Python数据分析AI训练平台
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              基于Cloudflare免费资源，实现“3步认知+10个梯度项目+AI错题倒逼”的Python数据分析实操训练平台
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/learning-guide" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg">
                开始学习
              </Link>
              <Link to="/projects" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg">
                项目实操
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">平台特色</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">3步认知</h3>
              <p className="text-gray-600 text-center">
                学习引导、思维模型、行业争议，建立数据分析底层认知
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">10个梯度项目</h3>
              <p className="text-gray-600 text-center">
                从基础到高级，覆盖不同行业场景的数据分析项目
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="bg-amber-100 text-amber-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">AI错题倒逼</h3>
              <p className="text-gray-600 text-center">
                AI陪练，错题追问，帮助你深入理解数据分析思维
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">如何使用</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">学习认知模块</h3>
              <p className="text-gray-600">
                通过学习引导、思维模型和行业争议，建立数据分析底层认知
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">选择项目</h3>
              <p className="text-gray-600">
                从10个梯度项目中选择适合自己的项目开始练习
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">编写代码</h3>
              <p className="text-gray-600">
                在浏览器中编写Python代码，实时运行并查看结果
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI陪练</h3>
              <p className="text-gray-600">
                遇到问题时，AI会给予思路点拨和错题纠正
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">开始你的数据分析之旅</h2>
          <p className="text-xl mb-8">
            零成本、零运维，打开浏览器即可使用的Python数据分析训练平台
          </p>
          <Link to="/learning-guide" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg inline-block">
            立即开始
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;