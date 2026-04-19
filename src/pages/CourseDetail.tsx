import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('content');
  const [currentLesson, setCurrentLesson] = useState(1);

  // 模拟课程数据
  const course = {
    id: id,
    title: 'Python基础入门',
    description: '掌握Python编程基础，为数据分析打下坚实基础',
    instructor: '张老师',
    duration: '10小时',
    lessons: [
      { id: 1, title: 'Python简介', duration: '45分钟' },
      { id: 2, title: '变量和数据类型', duration: '60分钟' },
      { id: 3, title: '控制流', duration: '60分钟' },
      { id: 4, title: '函数', duration: '75分钟' },
      { id: 5, title: '数据结构', duration: '90分钟' }
    ],
    exercises: [
      {
        id: 1,
        title: '变量练习',
        description: '创建变量并进行基本操作',
        code: '# 在这里编写你的代码\n# 示例：创建一个变量并打印\nname = "DataLearn"\nprint(f"Hello, {name}!")',
        testCases: [
          { input: '', expected: 'Hello, DataLearn!' }
        ]
      }
    ],
    assessments: [
      {
        id: 1,
        title: '第一章测评',
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'Python中，以下哪个不是基本数据类型？',
            options: ['int', 'float', 'string', 'array'],
            correctAnswer: 'array'
          },
          {
            id: 2,
            type: 'multiple-choice',
            question: 'Python中，如何定义一个函数？',
            options: ['function my_func():', 'def my_func():', 'func my_func():', 'create function my_func()'],
            correctAnswer: 'def my_func():'
          }
        ]
      }
    ]
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">讲师:</span>
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">总时长:</span>
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2">课时:</span>
              <span>{course.lessons.length}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Lessons */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">课程大纲</h2>
              <ul className="space-y-2">
                {course.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => setCurrentLesson(lesson.id)}
                      className={`w-full text-left p-3 rounded-md flex justify-between items-center ${currentLesson === lesson.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                    >
                      <span>第{lesson.id}章: {lesson.title}</span>
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'content' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    课程内容
                  </button>
                  <button
                    onClick={() => setActiveTab('exercises')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'exercises' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    互动练习
                  </button>
                  <button
                    onClick={() => setActiveTab('assessments')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'assessments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  >
                    测评
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Course Content Tab */}
                {activeTab === 'content' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{course.lessons[currentLesson - 1].title}</h3>
                    <div className="mb-6">
                      {/* Video Player */}
                      <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center mb-6">
                        <span className="text-white text-2xl">视频播放器</span>
                      </div>
                      {/* Lesson Content */}
                      <div className="prose max-w-none">
                        <h4>课程内容</h4>
                        <p>欢迎来到Python基础入门课程的第{currentLesson}章。本章节将介绍{course.lessons[currentLesson - 1].title}的相关内容。</p>
                        <p>Python是一种高级编程语言，具有简单易学的语法和强大的功能。它被广泛应用于数据分析、人工智能、Web开发等领域。</p>
                        <p>在本章节中，你将学习以下内容：</p>
                        <ul>
                          <li>Python的基本语法</li>
                          <li>如何编写和运行Python代码</li>
                          <li>基本的数据类型和操作</li>
                        </ul>
                      </div>
                    </div>
                    {/* Navigation */}
                    <div className="flex justify-between">
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium disabled:opacity-50" disabled={currentLesson === 1}>
                        上一章
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium disabled:opacity-50" disabled={currentLesson === course.lessons.length}>
                        下一章
                      </button>
                    </div>
                  </div>
                )}

                {/* Exercises Tab */}
                {activeTab === 'exercises' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">互动练习</h3>
                    {course.exercises.map((exercise) => (
                      <div key={exercise.id} className="mb-8">
                        <h4 className="text-lg font-medium mb-2">{exercise.title}</h4>
                        <p className="text-gray-600 mb-4">{exercise.description}</p>
                        {/* Code Editor */}
                        <div className="bg-gray-900 rounded-lg p-4 mb-4">
                          <pre className="text-gray-300 font-mono text-sm">{exercise.code}</pre>
                        </div>
                        <div className="flex justify-between">
                          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium">
                            运行代码
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                            提交答案
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Assessments Tab */}
                {activeTab === 'assessments' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">测评</h3>
                    {course.assessments.map((assessment) => (
                      <div key={assessment.id} className="mb-8">
                        <h4 className="text-lg font-medium mb-4">{assessment.title}</h4>
                        {assessment.questions.map((question) => (
                          <div key={question.id} className="mb-6">
                            <p className="mb-3">{question.question}</p>
                            <div className="space-y-2">
                              {question.options.map((option, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`option-${question.id}-${index}`}
                                    name={`question-${question.id}`}
                                    value={option}
                                    className="mr-2"
                                  />
                                  <label htmlFor={`option-${question.id}-${index}`}>{option}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                          提交测评
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;