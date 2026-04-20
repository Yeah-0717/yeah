import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { runPythonCode, getMatplotlibFigure } from '../utils/pyodide';
import { getProjectProgress, saveProjectProgress, getChatMessages, saveChatMessages, ChatMessage } from '../utils/storage';
import { getAIGuidance, getAICodeFix } from '../utils/aiService';

// 项目数据
const projects = {
  project1: {
    title: '销售数据趋势分析',
    description: '分析销售数据的时间趋势，识别销售高峰和低谷，预测未来销售趋势',
    task: '1. 生成销售数据集\n2. 分析月度销售趋势\n3. 识别销售高峰和低谷\n4. 绘制销售趋势图\n5. 简单预测未来销售',
    level: 'beginner',
    category: '商务分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成销售数据
dates = pd.date_range('2023-01-01', '2023-12-31', freq='D')
sales = np.random.randint(5000, 20000, size=len(dates))

# 添加季节性波动
for i, date in enumerate(dates):
    month = date.month
    if month in [12, 1, 2]:  # 旺季
        sales[i] *= 1.5
    elif month in [6, 7, 8]:  # 淡季
        sales[i] *= 0.7

df = pd.DataFrame({'date': dates, 'sales': sales})
df['month'] = df['date'].dt.month

# 计算月度销售总额
monthly_sales = df.groupby('month')['sales'].sum()

print('月度销售数据:')
print(monthly_sales)

# 绘制销售趋势图
plt.figure(figsize=(10, 6))
plt.plot(monthly_sales.index, monthly_sales.values, marker='o')
plt.title('2023年月度销售趋势')
plt.xlabel('月份')
plt.ylabel('销售额')
plt.grid(True)
plt.show()
`
  },
  project2: {
    title: '客户分群与价值评估',
    description: '基于客户购买行为和消费金额，对客户进行分群并评估其价值',
    task: '1. 生成客户数据集\n2. 分析客户购买行为\n3. 使用K-means对客户进行分群\n4. 评估不同客户群的价值\n5. 绘制客户分群可视化',
    level: 'beginner',
    category: '客户分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

# 生成客户数据
np.random.seed(42)
n_customers = 200

# 生成客户特征
customer_id = range(1, n_customers + 1)
purchase_frequency = np.random.randint(1, 50, size=n_customers)
avg_order_value = np.random.uniform(50, 500, size=n_customers)
total_spend = purchase_frequency * avg_order_value
last_purchase_days = np.random.randint(1, 365, size=n_customers)

# 创建DataFrame
df = pd.DataFrame({
    'customer_id': customer_id,
    'purchase_frequency': purchase_frequency,
    'avg_order_value': avg_order_value,
    'total_spend': total_spend,
    'last_purchase_days': last_purchase_days
})

# 选择特征进行聚类
features = ['purchase_frequency', 'total_spend', 'last_purchase_days']
X = df[features]

# 使用K-means进行聚类
kmeans = KMeans(n_clusters=4, random_state=42)
df['cluster'] = kmeans.fit_predict(X)

# 分析每个聚类的特征
cluster_analysis = df.groupby('cluster').agg({
    'purchase_frequency': 'mean',
    'total_spend': 'mean',
    'last_purchase_days': 'mean',
    'customer_id': 'count'
}).rename(columns={'customer_id': 'count'})

print('客户分群分析:')
print(cluster_analysis)

# 可视化聚类结果
plt.figure(figsize=(10, 6))
plt.scatter(df['purchase_frequency'], df['total_spend'], c=df['cluster'], cmap='viridis')
plt.title('客户分群结果')
plt.xlabel('购买频率')
plt.ylabel('总消费额')
plt.colorbar(label='聚类')
plt.show()
`
  },
  // 其他项目的数据可以根据需要添加
  project3: {
    title: '产品销售表现分析',
    description: '分析不同产品的销售表现，识别热销产品和滞销产品',
    task: '1. 生成产品销售数据\n2. 分析各产品的销售表现\n3. 识别热销和滞销产品\n4. 分析产品类别表现\n5. 绘制产品销售排行榜',
    level: 'beginner',
    category: '产品分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成产品销售数据
products = ['产品A', '产品B', '产品C', '产品D', '产品E', '产品F', '产品G', '产品H']
categories = ['电子产品', '服装', '食品', '家居', '电子产品', '服装', '食品', '家居']

# 生成销售数据
data = []
for i, product in enumerate(products):
    sales = np.random.randint(1000, 10000, size=12)  # 12个月的销售数据
    for month in range(12):
        data.append({
            'product': product,
            'category': categories[i],
            'month': month + 1,
            'sales': sales[month]
        })

df = pd.DataFrame(data)

# 计算每个产品的总销售额
product_sales = df.groupby('product')['sales'].sum().sort_values(ascending=False)

# 计算每个类别的总销售额
category_sales = df.groupby('category')['sales'].sum().sort_values(ascending=False)

print('产品销售排行榜:')
print(product_sales)

print('\n类别销售排行榜:')
print(category_sales)

# 绘制产品销售排行榜
plt.figure(figsize=(12, 6))
product_sales.plot(kind='bar')
plt.title('产品销售排行榜')
plt.xlabel('产品')
plt.ylabel('总销售额')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 绘制类别销售饼图
plt.figure(figsize=(8, 8))
category_sales.plot(kind='pie', autopct='%1.1f%%')
plt.title('类别销售分布')
plt.ylabel('')
plt.tight_layout()
plt.show()
`
  }
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projects[id as keyof typeof projects];
  
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [figure, setFigure] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState('');
  const [isAICalling, setIsAICalling] = useState(false);
  
  const editorRef = useRef<any>(null);

  // 加载项目进度
  useEffect(() => {
    if (project) {
      const progress = getProjectProgress(id!);
      setCode(progress.code || project.starterCode);
      setCompleted(progress.completed);
      setChatMessages(getChatMessages(id!));
    }
  }, [id, project]);

  // 保存代码到LocalStorage
  useEffect(() => {
    if (id && code) {
      saveProjectProgress(id, { code, completed });
    }
  }, [id, code, completed]);

  // 运行代码
  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('');
    setFigure(null);
    
    try {
      const result = await runPythonCode(code);
      if (result.success) {
        setOutput(result.result?.toString() || '代码执行成功');
        
        // 获取图表
        const figResult = await getMatplotlibFigure();
        if (figResult.success && figResult.figure) {
          setFigure(figResult.figure);
        }
      } else {
        setOutput(`错误: ${result.error}`);
      }
    } catch (error) {
      setOutput(`执行错误: ${(error as Error).message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // 处理AI请求
  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    
    const newMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setUserMessage('');
    setIsAICalling(true);
    
    try {
      const result = await getAIGuidance(id!, code, userMessage);
      if (result.success) {
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: result.message,
          timestamp: Date.now()
        };
        setChatMessages(prev => [...prev, aiMessage]);
      } else {
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: `AI请求失败: ${result.error}`,
          timestamp: Date.now()
        };
        setChatMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `AI请求失败: ${(error as Error).message}`,
        timestamp: Date.now()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAICalling(false);
    }
  };

  // 保存聊天记录
  useEffect(() => {
    if (id && chatMessages.length > 0) {
      saveChatMessages(id, chatMessages);
    }
  }, [id, chatMessages]);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-6">项目不存在</h1>
        <Link to="/projects" className="text-blue-600 hover:text-blue-800 font-semibold">
          返回项目列表
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.level === 'beginner' ? 'bg-green-100 text-green-800' : project.level === 'intermediate' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                  {project.level === 'beginner' ? '基础' : project.level === 'intermediate' ? '中级' : '高级'}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
            </div>
            <Link to="/projects" className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold">
              返回项目列表
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Project Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">项目描述</h2>
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">任务要求</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">{project.task}</pre>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">AI陪练</h2>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg mb-4">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isAICalling && (
                      <div className="text-left">
                        <div className="inline-block max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
                          AI正在思考...
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="输入你的问题..."
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={isAICalling}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                      发送
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Code Editor */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">代码编辑器</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2"
                    >
                      {isRunning ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          运行中...
                        </>
                      ) : (
                        '运行代码'
                      )}
                    </button>
                    <button 
                      onClick={() => setCompleted(!completed)}
                      className={`px-4 py-2 rounded-lg font-semibold ${completed ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                      {completed ? '标记为未完成' : '标记为完成'}
                    </button>
                  </div>
                </div>
                
                <div className="h-96 mb-4">
                  <Editor
                    height="100%"
                    defaultLanguage="python"
                    value={code}
                    onChange={(value) => value && setCode(value)}
                    options={{
                      minimap: { enabled: true },
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                      tabSize: 4,
                      automaticLayout: true
                    }}
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">运行结果</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <pre className="whitespace-pre-wrap text-sm">{output}</pre>
                  </div>
                </div>
                
                {figure && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">图表</h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-center">
                      <img src={figure} alt="图表" className="max-w-full h-auto" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
