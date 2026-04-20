import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 争议话题数据
const controversies = [
  {
    id: 'controversy1',
    title: '数据隐私与伦理',
    description: '在数据分析过程中，如何平衡数据利用与个人隐私保护？',
    arguments: [
      {
        side: '支持数据广泛使用',
        points: [
          '数据驱动决策可以带来更好的产品和服务',
          '匿名化处理可以保护个人隐私',
          '数据共享可以加速科学研究和创新'
        ]
      },
      {
        side: '强调隐私保护',
        points: [
          '个人数据应该得到严格保护',
          '用户应该对自己的数据有完全控制权',
          '数据泄露会带来严重后果'
        ]
      }
    ],
    quiz: {
      question: '在数据分析中，以下哪种做法最符合伦理要求？',
      options: [
        '未经用户同意收集和使用数据',
        '收集数据但不告知用户',
        '明确告知用户数据收集目的并获得同意',
        '出售用户数据给第三方'
      ],
      correctAnswer: 2
    }
  },
  {
    id: 'controversy2',
    title: '算法偏见与公平性',
    description: '算法在数据分析中是否会引入偏见，如何确保算法的公平性？',
    arguments: [
      {
        side: '算法是客观的',
        points: [
          '算法基于数据，避免了人类的主观偏见',
          '算法可以标准化决策过程',
          '算法可以通过优化不断改进'
        ]
      },
      {
        side: '算法存在偏见',
        points: [
          '算法训练数据可能存在偏见',
          '算法设计过程中可能引入偏见',
          '算法决策缺乏透明度和可解释性'
        ]
      }
    ],
    quiz: {
      question: '以下哪种方法可以减少算法偏见？',
      options: [
        '使用更多的数据',
        '使用多样化的训练数据',
        '完全依赖算法决策',
        '忽略算法的公平性问题'
      ],
      correctAnswer: 1
    }
  },
  {
    id: 'controversy3',
    title: '传统统计vs机器学习',
    description: '在数据分析中，传统统计方法与机器学习方法各有什么优缺点？',
    arguments: [
      {
        side: '传统统计方法更好',
        points: [
          '传统统计方法理论基础扎实',
          '结果可解释性强',
          '对数据质量要求较低'
        ]
      },
      {
        side: '机器学习方法更好',
        points: [
          '机器学习可以处理复杂的数据关系',
          '自动特征提取能力强',
          '在大数据场景下表现优异'
        ]
      }
    ],
    quiz: {
      question: '在以下哪种场景下，传统统计方法可能更适合？',
      options: [
        '处理海量非结构化数据',
        '需要强可解释性的决策场景',
        '预测复杂的非线性关系',
        '自动化特征提取'
      ],
      correctAnswer: 1
    }
  },
  {
    id: 'controversy4',
    title: '数据分析职业发展',
    description: '数据分析职业的未来发展趋势是什么？数据分析人员需要具备哪些技能？',
    arguments: [
      {
        side: '技术技能最重要',
        points: [
          '编程能力是数据分析的基础',
          '掌握高级分析工具可以提高效率',
          '技术创新推动行业发展'
        ]
      },
      {
        side: '业务理解更重要',
        points: [
          '理解业务需求是数据分析的核心',
          '沟通能力决定了分析结果的价值',
          '行业知识可以提供更有针对性的分析'
        ]
      }
    ],
    quiz: {
      question: '以下哪种技能对数据分析人员最重要？',
      options: [
        '只需要技术技能',
        '只需要业务知识',
        '技术技能和业务知识的结合',
        '不需要任何技能，依赖工具即可'
      ],
      correctAnswer: 2
    }
  }
];

const Controversy: React.FC = () => {
  const [selectedControversy, setSelectedControversy] = useState(controversies[0]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSubmit = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNextControversy = (controversy: typeof controversies[0]) => {
    setSelectedControversy(controversy);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              行业争议
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              了解数据分析领域的前沿争议和话题，培养批判性思维
            </p>
          </div>
        </div>
      </section>

      {/* Controversy Navigation */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {controversies.map((controversy) => (
              <button
                key={controversy.id}
                onClick={() => handleNextControversy(controversy)}
                className={`px-4 py-2 rounded-lg font-semibold ${selectedControversy.id === controversy.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {controversy.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Controversy Detail */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6">{selectedControversy.title}</h2>
              <p className="text-gray-600 mb-8">{selectedControversy.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {selectedControversy.arguments.map((argument, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">{argument.side}</h3>
                    <ul className="space-y-3">
                      {argument.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-8">
                <h3 className="text-2xl font-semibold mb-6">辨析题</h3>
                <p className="text-lg mb-6">{selectedControversy.quiz.question}</p>
                <div className="space-y-4">
                  {selectedControversy.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => !showResult && handleAnswerSubmit(index)}
                      className={`w-full text-left p-4 rounded-lg font-medium ${showResult ? (
                        index === selectedControversy.quiz.correctAnswer 
                          ? 'bg-green-100 text-green-800' 
                          : index === selectedAnswer 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-gray-100 text-gray-700'
                      ) : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      disabled={showResult}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showResult && (
                  <div className="mt-6 p-4 rounded-lg bg-blue-50 text-blue-800">
                    <p className="font-semibold">
                      {selectedAnswer === selectedControversy.quiz.correctAnswer
                        ? '回答正确！'
                        : '回答错误，再试一次！'
                      }
                    </p>
                    <p className="mt-2">
                      {selectedControversy.quiz.correctAnswer === 0 && '未经用户同意收集和使用数据是不符合伦理要求的。'}
                      {selectedControversy.quiz.correctAnswer === 1 && '使用多样化的训练数据可以减少算法偏见。'}
                      {selectedControversy.quiz.correctAnswer === 2 && '明确告知用户数据收集目的并获得同意是符合伦理要求的做法。'}
                      {selectedControversy.quiz.correctAnswer === 3 && '技术技能和业务知识的结合对数据分析人员最重要。'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">培养批判性思维</h2>
          <p className="text-xl mb-8">
            通过思考这些争议话题，培养你对数据分析的批判性思维能力
          </p>
          <Link to="/projects" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg inline-block">
            开始项目实操
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Controversy;
