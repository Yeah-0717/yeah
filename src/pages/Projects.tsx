import React from 'react';
import { Link } from 'react-router-dom';
import { getAllProgress } from '../utils/storage';

// 项目类型定义
interface Project {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

// 项目数据
const projects: Project[] = [
  {
    id: 'project1',
    title: '销售数据趋势分析',
    description: '分析销售数据的时间趋势，识别销售高峰和低谷，预测未来销售趋势',
    level: 'beginner',
    category: '商务分析'
  },
  {
    id: 'project2',
    title: '客户分群与价值评估',
    description: '基于客户购买行为和消费金额，对客户进行分群并评估其价值',
    level: 'beginner',
    category: '客户分析'
  },
  {
    id: 'project3',
    title: '产品销售表现分析',
    description: '分析不同产品的销售表现，识别热销产品和滞销产品',
    level: 'beginner',
    category: '产品分析'
  },
  {
    id: 'project4',
    title: '市场竞争格局分析',
    description: '分析市场竞争格局，评估竞争对手的优势和劣势',
    level: 'intermediate',
    category: '市场分析'
  },
  {
    id: 'project5',
    title: '用户行为路径分析',
    description: '分析用户在网站或应用中的行为路径，优化用户体验',
    level: 'intermediate',
    category: '用户分析'
  },
  {
    id: 'project6',
    title: '营销活动效果分析',
    description: '分析营销活动的效果，评估ROI，优化营销策略',
    level: 'intermediate',
    category: '营销分析'
  },
  {
    id: 'project7',
    title: '库存优化分析',
    description: '分析库存水平和周转情况，优化库存管理策略',
    level: 'intermediate',
    category: '供应链分析'
  },
  {
    id: 'project8',
    title: '财务指标分析与预测',
    description: '分析财务指标，预测未来财务表现，支持决策制定',
    level: 'advanced',
    category: '财务分析'
  },
  {
    id: 'project9',
    title: '人力资源数据分析',
    description: '分析员工绩效、流失率等人力资源数据，优化人力资源管理',
    level: 'advanced',
    category: '人力资源分析'
  },
  {
    id: 'project10',
    title: '综合业务仪表盘',
    description: '创建综合业务仪表盘，整合多维度数据，提供决策支持',
    level: 'advanced',
    category: '综合分析'
  }
];

const Projects: React.FC = () => {
  const progress = getAllProgress();

  // 获取项目完成状态
  const getProjectStatus = (projectId: string) => {
    return progress[projectId]?.completed || false;
  };

  // 获取难度标签颜色
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              项目实操
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              10个梯度项目，从基础到高级，覆盖不同行业场景的数据分析实践
            </p>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">10个梯度项目</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    {getProjectStatus(project.id) && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        已完成
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(project.level)}`}>
                      {project.level === 'beginner' ? '基础' : project.level === 'intermediate' ? '中级' : '高级'}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <Link 
                    to={`/projects/${project.id}`} 
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg font-semibold"
                  >
                    开始项目
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">选择适合你的项目</h2>
          <p className="text-xl mb-8">
            从基础项目开始，逐步挑战更复杂的分析任务，提升你的数据分析技能
          </p>
          <Link to="/learning-guide" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg inline-block">
            先学习认知模块
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
