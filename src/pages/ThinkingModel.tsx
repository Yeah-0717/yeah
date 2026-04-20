import React from 'react';
import { Link } from 'react-router-dom';

const ThinkingModel: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              思维模型
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              掌握数据分析的核心思维模型，培养数据驱动的决策能力
            </p>
          </div>
        </div>
      </section>

      {/* Thinking Models */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">核心思维模型</h2>
          
          <div className="space-y-16">
            {/* Model 1 */}
            <div className="bg-white rounded-lg shadow p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-blue-100 text-blue-600 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">数据驱动决策思维</h3>
                  <p className="text-gray-600 mb-6">
                    基于数据而非直觉或经验做出决策，通过数据收集、分析和验证来支持决策过程。
                  </p>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold mb-4">关键要素</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>明确决策目标和问题定义</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>收集相关且高质量的数据</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>运用适当的分析方法和工具</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>客观解读分析结果</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span>基于数据结果制定决策</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Model 2 */}
            <div className="bg-white rounded-lg shadow p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-green-100 text-green-600 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold">2</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">问题定义与拆解</h3>
                  <p className="text-gray-600 mb-6">
                    将复杂问题分解为可管理的小问题，明确问题边界和解决路径。
                  </p>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold mb-4">关键步骤</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>清晰定义问题，避免模糊和歧义</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>识别问题的根本原因，而非表面现象</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>将大问题分解为多个小问题</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>确定解决问题的优先级和顺序</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>制定详细的分析计划和步骤</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Model 3 */}
            <div className="bg-white rounded-lg shadow p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-amber-100 text-amber-600 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold">3</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">数据质量评估</h3>
                  <p className="text-gray-600 mb-6">
                    评估数据的准确性、完整性、一致性和可靠性，确保分析结果的可信度。
                  </p>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold mb-4">评估维度</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      <span>准确性：数据是否正确反映了真实情况</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      <span>完整性：数据是否包含所有必要的信息</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      <span>一致性：数据在不同来源和时间点是否一致</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      <span>可靠性：数据是否稳定且可重复</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-2">✓</span>
                      <span>及时性：数据是否及时更新和反映最新情况</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Model 4 */}
            <div className="bg-white rounded-lg shadow p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="bg-purple-100 text-purple-600 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold">4</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">结果解读与沟通</h3>
                  <p className="text-gray-600 mb-6">
                    正确解读分析结果，并用清晰、简洁的方式向利益相关者传达发现和建议。
                  </p>
                </div>
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold mb-4">有效沟通技巧</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>使用可视化工具展示数据和结果</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>突出关键发现和洞察</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>提供具体的行动建议</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>适应不同受众的技术水平</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>用故事化的方式呈现分析结果</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">实践思维模型</h2>
          <p className="text-xl mb-8">
            通过实际项目练习，将这些思维模型应用到具体的数据分析场景中
          </p>
          <Link to="/projects" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg inline-block">
            开始项目实操
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ThinkingModel;
