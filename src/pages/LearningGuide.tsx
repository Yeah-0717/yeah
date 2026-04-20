import React from 'react';
import { Link } from 'react-router-dom';

const LearningGuide: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              学习引导
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              了解平台的学习流程和核心概念，为你的数据分析之旅做好准备
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Cognition */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">3步认知</h2>
          
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-blue-100 text-blue-600 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">学习引导</h3>
                <p className="text-gray-600 mb-6">
                  了解数据分析的基本概念、工具和流程，建立对数据分析的整体认知。通过交互式教程，掌握Python数据分析的核心技能。
                </p>
                <Link to="/learning-guide" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center">
                  开始学习引导
                  <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="md:w-1/2 bg-gray-100 rounded-lg p-6">
                <h4 className="font-semibold mb-4">学习引导内容</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>数据分析基本概念</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Python数据分析工具链</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>数据处理流程</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>图表可视化基础</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-green-100 text-green-600 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">思维模型</h3>
                <p className="text-gray-600 mb-6">
                  学习数据分析的思维模型，掌握数据分析的核心方法论。通过实际案例，理解如何用数据思维解决问题。
                </p>
                <Link to="/thinking-model" className="text-green-600 hover:text-green-800 font-semibold flex items-center">
                  学习思维模型
                  <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="md:w-1/2 bg-gray-100 rounded-lg p-6">
                <h4 className="font-semibold mb-4">思维模型内容</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>数据驱动决策思维</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>问题定义与拆解</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>数据质量评估</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>结果解读与沟通</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="bg-amber-100 text-amber-600 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                  <span className="text-3xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">行业争议</h3>
                <p className="text-gray-600 mb-6">
                  了解数据分析领域的行业争议和前沿话题，培养批判性思维。通过辨析题，加深对数据分析核心概念的理解。
                </p>
                <Link to="/controversy" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center">
                  探索行业争议
                  <span className="ml-2">→</span>
                </Link>
              </div>
              <div className="md:w-1/2 bg-gray-100 rounded-lg p-6">
                <h4 className="font-semibold mb-4">行业争议内容</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>数据隐私与伦理</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>算法偏见与公平性</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>传统统计vs机器学习</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-600 mr-2">✓</span>
                    <span>数据分析职业发展</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">准备好开始了吗？</h2>
          <p className="text-xl mb-8">
            完成认知模块后，你将具备数据分析的基本思维和技能，为后续的项目实操做好准备
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/thinking-model" className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold text-lg">
              开始认知模块
            </Link>
            <Link to="/projects" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg">
              浏览项目
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningGuide;
