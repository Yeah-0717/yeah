import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { runPythonCode, getMatplotlibFigure } from '../utils/pyodide';
import { getProjectProgress, saveProjectProgress, getChatMessages, saveChatMessages, ChatMessage } from '../utils/storage';
import { getAIGuidance } from '../utils/aiService';

// 知识点类型定义
interface KnowledgePoint {
  title: string;
  content: string;
  color: string;
}

// 项目详细数据结构
interface ProjectDetail {
  title: string;
  description: string;
  task: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  starterCode: string;
  knowledgePoints: KnowledgePoint[];
}

// 项目数据 - 包含详细的知识点
const projects: Record<string, ProjectDetail> = {
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
`,
    knowledgePoints: [
      {
        title: '什么是销售数据分析',
        content: '销售数据分析是通过对销售数据进行收集、整理、分析，从中发现销售规律、趋势和问题，为销售决策提供数据支持的过程。它是商务数据分析的基础应用之一。',
        color: 'blue'
      },
      {
        title: '核心概念：时间序列',
        content: '时间序列是按时间顺序排列的数据点序列。在销售分析中，时间序列可以帮助我们观察销售数据随时间的变化规律，识别趋势、周期性和季节性。',
        color: 'green'
      },
      {
        title: '核心指标：销售额',
        content: '销售额是衡量销售业绩的核心指标，指在一定时期内销售商品或服务的总金额。通过分析销售额的时间分布，可以了解业务的健康状况。',
        color: 'amber'
      },
      {
        title: '分析方法：趋势分析',
        content: '趋势分析是通过观察数据随时间的变化方向，判断业务是增长、下降还是稳定。常用方法包括：移动平均线、同比环比分析、趋势线拟合等。',
        color: 'purple'
      },
      {
        title: '分析方法：季节性分析',
        content: '季节性分析识别数据中周期性重复的模式。零售行业通常有淡旺季之分，了解季节性规律有助于库存管理和营销策略制定。',
        color: 'pink'
      }
    ]
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
`,
    knowledgePoints: [
      {
        title: '什么是客户分群',
        content: '客户分群（Customer Segmentation）是将客户按照特定特征划分为不同群体的过程。通过分群，企业可以针对不同群体制定差异化的营销策略，提高客户满意度和留存率。',
        color: 'blue'
      },
      {
        title: '核心概念：RFM模型',
        content: 'RFM模型是客户价值分析的经典方法，包含三个维度：R（Recency，最近购买时间）、F（Frequency，购买频率）、M（Monetary，消费金额）。RFM模型帮助识别高价值客户和流失风险客户。',
        color: 'green'
      },
      {
        title: '核心指标：客户生命周期价值（CLV）',
        content: '客户生命周期价值是指一个客户在与企业关系存续期间为企业带来的总收益。CLV是评估客户价值的重要指标，帮助企业识别最值得投入资源的客户群体。',
        color: 'amber'
      },
      {
        title: '分析方法：K-means聚类',
        content: 'K-means是一种无监督学习算法，通过计算数据点之间的距离，将数据划分为K个簇。在客户分群中，K-means可以根据客户的购买行为特征自动发现不同的客户群体。',
        color: 'purple'
      },
      {
        title: '应用场景：精准营销',
        content: '客户分群的结果可以应用于精准营销：对高价值客户提供VIP服务，对潜在流失客户进行挽回，对新客户进行激活，对低价值客户降低营销成本。',
        color: 'pink'
      }
    ]
  },
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
`,
    knowledgePoints: [
      {
        title: '什么是产品分析',
        content: '产品分析是通过对产品相关数据的分析，了解产品的市场表现、用户反馈和盈利能力，为产品优化、定价策略和库存管理提供决策支持。',
        color: 'blue'
      },
      {
        title: '核心概念：ABC分析法',
        content: 'ABC分析法将产品按照销售额或利润贡献分为A、B、C三类：A类（重要少数，占销售额70%）、B类（中等，占20%）、C类（次要多数，占10%）。这有助于企业集中资源管理关键产品。',
        color: 'green'
      },
      {
        title: '核心指标：销售增长率',
        content: '销售增长率 = (本期销售额 - 上期销售额) / 上期销售额 × 100%。该指标反映产品的增长势头，是判断产品生命周期阶段的重要依据。',
        color: 'amber'
      },
      {
        title: '分析方法：帕累托分析',
        content: '帕累托分析（80/20法则）指出，80%的销售额往往来自20%的产品。通过识别这20%的关键产品，企业可以优化产品组合，提高整体盈利能力。',
        color: 'purple'
      },
      {
        title: '应用场景：库存优化',
        content: '产品分析结果可以指导库存管理：对热销产品保持充足库存，对滞销产品进行促销清仓，对新品进行试销评估，实现库存成本和销售机会的平衡。',
        color: 'pink'
      }
    ]
  },
  project4: {
    title: '市场竞争格局分析',
    description: '分析市场竞争格局，评估竞争对手的优势和劣势',
    task: '1. 生成市场竞争数据\n2. 计算市场份额\n3. 分析竞争对手表现\n4. 绘制竞争格局图\n5. 提出竞争策略建议',
    level: 'intermediate',
    category: '市场分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成市场竞争数据
companies = ['我们公司', '竞争对手A', '竞争对手B', '竞争对手C', '其他']
market_share = [25, 30, 20, 15, 10]
growth_rate = [15, 8, 12, 5, 3]

# 创建DataFrame
df = pd.DataFrame({
    'company': companies,
    'market_share': market_share,
    'growth_rate': growth_rate
})

print('市场竞争格局:')
print(df)

# 绘制市场份额饼图
plt.figure(figsize=(10, 8))
plt.pie(market_share, labels=companies, autopct='%1.1f%%', startangle=90)
plt.title('市场份额分布')
plt.axis('equal')
plt.show()

# 绘制增长率对比图
plt.figure(figsize=(10, 6))
plt.bar(companies, growth_rate, color=['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'])
plt.title('各公司增长率对比')
plt.xlabel('公司')
plt.ylabel('增长率 (%)')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
`,
    knowledgePoints: [
      {
        title: '什么是竞争分析',
        content: '竞争分析是系统地收集、分析和评估竞争对手信息的过程，帮助企业了解自身在市场中的位置，识别竞争优势和劣势，制定有效的竞争策略。',
        color: 'blue'
      },
      {
        title: '核心概念：市场份额',
        content: '市场份额 = 企业销售额 / 市场总销售额 × 100%。市场份额是衡量企业市场地位的关键指标，高市场份额通常意味着更强的议价能力和规模效应。',
        color: 'green'
      },
      {
        title: '核心指标：相对市场份额',
        content: '相对市场份额 = 企业市场份额 / 最大竞争对手市场份额。该指标反映企业与市场领导者的差距，是波士顿矩阵（BCG Matrix）的重要维度。',
        color: 'amber'
      },
      {
        title: '分析框架：波特五力模型',
        content: '波特五力模型分析行业竞争强度：供应商议价能力、买方议价能力、新进入者威胁、替代品威胁、现有竞争者竞争程度。这五种力量决定了行业的盈利潜力。',
        color: 'purple'
      },
      {
        title: '应用场景：战略定位',
        content: '竞争分析帮助企业确定战略定位：领导者（防守策略）、挑战者（进攻策略）、跟随者（模仿策略）、补缺者（利基市场策略）。',
        color: 'pink'
      }
    ]
  },
  project5: {
    title: '用户行为路径分析',
    description: '分析用户在网站或应用中的行为路径，优化用户体验',
    task: '1. 生成用户行为数据\n2. 分析用户转化漏斗\n3. 识别流失节点\n4. 绘制用户路径图\n5. 提出优化建议',
    level: 'intermediate',
    category: '用户分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成用户行为数据
np.random.seed(42)
n_users = 1000

# 模拟用户转化漏斗
data = {
    '页面': ['首页', '商品页', '购物车', '结算页', '支付成功'],
    '用户数': [1000, 600, 300, 150, 100],
    '转化率': [100, 60, 50, 50, 66.7]
}

funnel_df = pd.DataFrame(data)

print('用户转化漏斗:')
print(funnel_df)

# 绘制转化漏斗图
plt.figure(figsize=(10, 6))
colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
bars = plt.bar(funnel_df['页面'], funnel_df['用户数'], color=colors)

# 添加数值标签
for bar, value in zip(bars, funnel_df['用户数']):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 10, 
             str(value), ha='center', va='bottom', fontweight='bold')

plt.title('用户转化漏斗分析')
plt.xlabel('页面')
plt.ylabel('用户数')
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 计算各阶段流失率
funnel_df['流失率'] = funnel_df['用户数'].diff().fillna(0) / funnel_df['用户数'].shift(1).fillna(funnel_df['用户数']) * -100
print('\n各阶段流失率:')
print(funnel_df[['页面', '流失率']])
`,
    knowledgePoints: [
      {
        title: '什么是用户行为分析',
        content: '用户行为分析是通过追踪和分析用户在产品中的操作行为，了解用户需求、使用习惯和痛点，为产品优化和用户体验改进提供数据支持。',
        color: 'blue'
      },
      {
        title: '核心概念：转化漏斗',
        content: '转化漏斗描述用户从进入产品到完成目标行为的逐步转化过程。每个阶段都会有用户流失，分析漏斗可以识别关键流失节点，优化转化路径。',
        color: 'green'
      },
      {
        title: '核心指标：跳出率',
        content: '跳出率 = 只访问一个页面就离开的用户数 / 总访问用户数 × 100%。高跳出率通常意味着页面内容或用户体验存在问题。',
        color: 'amber'
      },
      {
        title: '分析方法：路径分析',
        content: '路径分析追踪用户的完整行为轨迹，识别最常见的访问路径和异常路径。通过桑基图等可视化方式，可以直观展示用户流向。',
        color: 'purple'
      },
      {
        title: '应用场景：A/B测试',
        content: '基于用户行为分析的洞察，可以设计A/B测试验证优化方案：测试不同的页面布局、按钮文案、流程设计，用数据驱动产品决策。',
        color: 'pink'
      }
    ]
  },
  project6: {
    title: '营销活动效果分析',
    description: '分析营销活动的效果，评估ROI，优化营销策略',
    task: '1. 生成营销活动数据\n2. 计算营销ROI\n3. 分析各渠道效果\n4. 绘制效果对比图\n5. 提出优化建议',
    level: 'intermediate',
    category: '营销分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成营销活动数据
np.random.seed(42)

channels = ['搜索引擎', '社交媒体', '邮件营销', '展示广告', '内容营销']
cost = [50000, 30000, 10000, 20000, 15000]
revenue = [150000, 90000, 25000, 40000, 45000]
conversions = [500, 300, 100, 150, 200]

# 创建DataFrame
df = pd.DataFrame({
    '渠道': channels,
    '成本': cost,
    '收入': revenue,
    '转化数': conversions
})

# 计算ROI
df['ROI'] = (df['收入'] - df['成本']) / df['成本'] * 100
df['CPA'] = df['成本'] / df['转化数']  # 单次转化成本

print('营销活动效果分析:')
print(df)

# 绘制ROI对比图
plt.figure(figsize=(10, 6))
colors = ['#2ca02c' if roi > 0 else '#d62728' for roi in df['ROI']]
bars = plt.bar(df['渠道'], df['ROI'], color=colors)

# 添加数值标签
for bar, value in zip(bars, df['ROI']):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 5, 
             f'{value:.1f}%', ha='center', va='bottom', fontweight='bold')

plt.title('各渠道ROI对比')
plt.xlabel('渠道')
plt.ylabel('ROI (%)')
plt.axhline(y=0, color='black', linestyle='--', alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
`,
    knowledgePoints: [
      {
        title: '什么是营销分析',
        content: '营销分析是通过对营销活动数据的分析，评估营销效果，优化营销投入产出比，帮助企业用更少的预算获得更好的营销结果。',
        color: 'blue'
      },
      {
        title: '核心概念：营销归因',
        content: '营销归因是确定不同营销渠道对转化的贡献程度。常用归因模型包括：首次接触归因、最后接触归因、线性归因、时间衰减归因等。',
        color: 'green'
      },
      {
        title: '核心指标：ROI（投资回报率）',
        content: 'ROI = (收益 - 成本) / 成本 × 100%。ROI是衡量营销效果的核心指标，正值表示盈利，负值表示亏损。ROI越高，营销效率越好。',
        color: 'amber'
      },
      {
        title: '核心指标：CAC（客户获取成本）',
        content: 'CAC = 营销总成本 / 新增客户数。CAC反映获取一个新客户的成本，与LTV（客户生命周期价值）结合使用，可以评估营销活动的可持续性。',
        color: 'purple'
      },
      {
        title: '应用场景：预算分配优化',
        content: '基于营销分析结果，可以优化预算分配：增加高ROI渠道的投入，减少或优化低ROI渠道，实现整体营销效率的最大化。',
        color: 'pink'
      }
    ]
  },
  project7: {
    title: '库存优化分析',
    description: '分析库存水平和周转情况，优化库存管理策略',
    task: '1. 生成库存数据\n2. 计算库存周转率\n3. 识别滞销商品\n4. 分析安全库存\n5. 提出库存优化建议',
    level: 'intermediate',
    category: '供应链分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成库存数据
np.random.seed(42)

products = ['产品A', '产品B', '产品C', '产品D', '产品E']
avg_inventory = [1000, 800, 1200, 600, 400]
annual_sales = [4800, 2400, 6000, 1200, 800]
unit_cost = [50, 80, 30, 100, 150]

# 创建DataFrame
df = pd.DataFrame({
    '产品': products,
    '平均库存': avg_inventory,
    '年销量': annual_sales,
    '单位成本': unit_cost
})

# 计算库存周转率
df['库存周转率'] = df['年销量'] / df['平均库存']
df['库存金额'] = df['平均库存'] * df['单位成本']

print('库存分析:')
print(df)

# 绘制库存周转率对比图
plt.figure(figsize=(10, 6))
colors = ['#2ca02c' if rate > 4 else '#ff7f0e' if rate > 2 else '#d62728' 
          for rate in df['库存周转率']]
bars = plt.bar(df['产品'], df['库存周转率'], color=colors)

# 添加数值标签
for bar, value in zip(bars, df['库存周转率']):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1, 
             f'{value:.1f}', ha='center', va='bottom', fontweight='bold')

plt.title('各产品库存周转率')
plt.xlabel('产品')
plt.ylabel('库存周转率（次/年）')
plt.axhline(y=4, color='green', linestyle='--', alpha=0.5, label='健康水平')
plt.axhline(y=2, color='red', linestyle='--', alpha=0.5, label='警戒线')
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()
`,
    knowledgePoints: [
      {
        title: '什么是库存分析',
        content: '库存分析是通过对库存数据的监控和分析，平衡库存成本和服务水平，避免缺货和积压，优化库存管理效率。',
        color: 'blue'
      },
      {
        title: '核心概念：库存周转率',
        content: '库存周转率 = 销售成本 / 平均库存。该指标反映库存的流动速度，周转率越高，说明库存管理效率越高，资金占用越少。',
        color: 'green'
      },
      {
        title: '核心概念：ABC库存分类',
        content: 'ABC分类将库存商品按价值分为三类：A类（高价值，占库存金额70%）、B类（中等价值，占20%）、C类（低价值，占10%）。不同类别采用不同的管理策略。',
        color: 'amber'
      },
      {
        title: '分析方法：安全库存计算',
        content: '安全库存 = (最大日销量 × 最长补货周期) - (平均日销量 × 平均补货周期)。安全库存用于应对需求波动和供应不确定性，防止缺货。',
        color: 'purple'
      },
      {
        title: '应用场景：滞销品处理',
        content: '通过库存分析识别滞销商品，及时采取促销、清仓、退货等措施，减少库存积压，释放资金和仓储空间。',
        color: 'pink'
      }
    ]
  },
  project8: {
    title: '财务指标分析与预测',
    description: '分析财务指标，预测未来财务表现，支持决策制定',
    task: '1. 生成财务数据\n2. 计算关键财务指标\n3. 分析盈利能力\n4. 预测未来趋势\n5. 提出财务建议',
    level: 'advanced',
    category: '财务分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# 生成财务数据（月度数据）
months = pd.date_range('2023-01', '2023-12', freq='M')
revenue = [100, 105, 110, 108, 115, 120, 118, 125, 130, 128, 135, 140]
cost = [60, 63, 66, 65, 69, 72, 71, 75, 78, 77, 81, 84]

# 创建DataFrame
df = pd.DataFrame({
    '月份': months,
    '收入': revenue,
    '成本': cost
})

df['毛利'] = df['收入'] - df['成本']
df['毛利率'] = df['毛利'] / df['收入'] * 100

print('财务指标分析:')
print(df)

# 预测未来3个月
X = np.arange(len(revenue)).reshape(-1, 1)
y = np.array(revenue)

model = LinearRegression()
model.fit(X, y)

# 预测未来3个月
future_months = np.array([12, 13, 14]).reshape(-1, 1)
future_revenue = model.predict(future_months)

print('\n未来3个月收入预测:')
for i, rev in enumerate(future_revenue, 1):
    print(f'2024年{i}月: {rev:.2f}万元')

# 绘制趋势图
plt.figure(figsize=(12, 6))
plt.plot(range(len(revenue)), revenue, 'o-', label='历史收入', linewidth=2)
plt.plot(range(len(revenue), len(revenue) + 3), future_revenue, 'o--', 
         label='预测收入', linewidth=2, color='red')
plt.title('收入趋势与预测')
plt.xlabel('月份')
plt.ylabel('收入（万元）')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()
`,
    knowledgePoints: [
      {
        title: '什么是财务数据分析',
        content: '财务数据分析是通过对企业财务报表和经营数据的分析，评估企业的财务状况、经营成果和现金流量，为投资决策、经营管理和风险控制提供依据。',
        color: 'blue'
      },
      {
        title: '核心概念：三大财务报表',
        content: '财务报表包括：资产负债表（反映企业某一时点的财务状况）、利润表（反映一定期间的经营成果）、现金流量表（反映现金的流入流出）。三张报表相互关联，共同描绘企业财务全貌。',
        color: 'green'
      },
      {
        title: '核心指标：毛利率',
        content: '毛利率 = (营业收入 - 营业成本) / 营业收入 × 100%。毛利率反映产品的盈利能力和定价策略的有效性，是衡量企业核心竞争力的重要指标。',
        color: 'amber'
      },
      {
        title: '核心指标：净资产收益率（ROE）',
        content: 'ROE = 净利润 / 净资产 × 100%。ROE反映股东权益的收益水平，是衡量企业盈利能力的核心指标。杜邦分析法将ROE分解为销售净利率、资产周转率和权益乘数。',
        color: 'purple'
      },
      {
        title: '分析方法：趋势预测',
        content: '通过时间序列分析、回归分析等方法，基于历史财务数据预测未来财务表现。预测结果可用于预算编制、资金规划和投资决策。',
        color: 'pink'
      },
      {
        title: '分析方法：比率分析',
        content: '财务比率分为四类：盈利能力比率（毛利率、净利率、ROE）、偿债能力比率（流动比率、资产负债率）、运营能力比率（存货周转率、应收账款周转率）、成长能力比率（收入增长率、利润增长率）。',
        color: 'indigo'
      }
    ]
  },
  project9: {
    title: '人力资源数据分析',
    description: '分析员工绩效、流失率等人力资源数据，优化人力资源管理',
    task: '1. 生成人力资源数据\n2. 分析员工绩效分布\n3. 计算流失率\n4. 识别离职风险因素\n5. 提出HR优化建议',
    level: 'advanced',
    category: '人力资源分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成员工数据
np.random.seed(42)
n_employees = 200

# 生成员工特征
dept = np.random.choice(['销售', '技术', '市场', '运营', '人事'], n_employees)
performance = np.random.normal(75, 15, n_employees).clip(0, 100)
salary = np.random.normal(8000, 3000, n_employees).clip(3000, 20000)
tenure = np.random.randint(0, 10, n_employees)  # 工作年限
satisfaction = np.random.normal(3.5, 1, n_employees).clip(1, 5)  # 满意度1-5

# 创建DataFrame
df = pd.DataFrame({
    '部门': dept,
    '绩效': performance,
    '薪资': salary,
    '工作年限': tenure,
    '满意度': satisfaction
})

# 标记离职风险（满意度低且工作年限短）
df['离职风险'] = (df['满意度'] < 2.5) & (df['工作年限'] < 2)

print('人力资源分析概览:')
print(df.describe())

# 各部门平均绩效
dept_performance = df.groupby('部门')['绩效'].mean().sort_values(ascending=False)
print('\n各部门平均绩效:')
print(dept_performance)

# 绘制绩效分布图
plt.figure(figsize=(10, 6))
plt.hist(df['绩效'], bins=20, edgecolor='black', alpha=0.7)
plt.title('员工绩效分布')
plt.xlabel('绩效评分')
plt.ylabel('人数')
plt.axvline(df['绩效'].mean(), color='red', linestyle='--', 
            label=f'平均值: {df["绩效"].mean():.1f}')
plt.legend()
plt.tight_layout()
plt.show()

# 离职风险统计
risk_count = df['离职风险'].sum()
print(f'\n离职风险员工数: {risk_count}人 ({risk_count/len(df)*100:.1f}%)')
`,
    knowledgePoints: [
      {
        title: '什么是人力资源分析',
        content: '人力资源分析（People Analytics）是通过对员工数据的分析，优化招聘、培训、绩效管理、薪酬福利等HR决策，提高组织效能和员工满意度。',
        color: 'blue'
      },
      {
        title: '核心概念：员工生命周期',
        content: '员工生命周期包括：招聘、入职、在职发展、绩效评估、晋升/调岗、离职。在每个阶段都可以通过数据分析优化管理策略。',
        color: 'green'
      },
      {
        title: '核心指标：员工流失率',
        content: '员工流失率 = 离职员工数 / 平均员工数 × 100%。高流失率会增加招聘和培训成本，影响团队稳定性。分析流失原因有助于制定留人策略。',
        color: 'amber'
      },
      {
        title: '核心指标：人均产出',
        content: '人均产出 = 总产出 / 员工数。该指标衡量员工效率，可用于评估部门绩效和优化人员配置。',
        color: 'purple'
      },
      {
        title: '分析方法：离职预测',
        content: '通过机器学习模型分析历史离职数据，识别离职风险因素（如工作年限、满意度、绩效、薪资水平等），提前预警高风险员工，采取干预措施。',
        color: 'pink'
      },
      {
        title: '应用场景：薪酬公平性分析',
        content: '分析不同性别、部门、职级的薪酬差异，识别潜在的薪酬歧视问题，确保薪酬体系的公平性和竞争力。',
        color: 'indigo'
      }
    ]
  },
  project10: {
    title: '综合业务仪表盘',
    description: '创建综合业务仪表盘，整合多维度数据，提供决策支持',
    task: '1. 整合各模块数据\n2. 设计仪表盘布局\n3. 实现关键指标展示\n4. 添加交互功能\n5. 实现数据联动',
    level: 'advanced',
    category: '综合分析',
    starterCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle

# 生成综合业务数据
np.random.seed(42)

# 创建模拟的仪表盘数据
dashboard_data = {
    '总销售额': 1250,
    '销售增长率': 15.3,
    '活跃用户数': 8500,
    '用户增长率': 8.7,
    '订单转化率': 3.2,
    '客户满意度': 4.5,
    '库存周转率': 6.8,
    '员工流失率': 5.2
}

# 月度销售趋势
months = ['1月', '2月', '3月', '4月', '5月', '6月']
monthly_sales = [95, 102, 110, 108, 120, 125]

print('业务仪表盘关键指标:')
for key, value in dashboard_data.items():
    print(f'{key}: {value}')

# 创建综合仪表盘
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
fig.suptitle('综合业务仪表盘', fontsize=16, fontweight='bold')

# 1. 销售趋势图
axes[0, 0].plot(months, monthly_sales, 'o-', linewidth=2, markersize=8)
axes[0, 0].set_title('月度销售趋势')
axes[0, 0].set_ylabel('销售额（万元）')
axes[0, 0].grid(True, alpha=0.3)

# 2. 关键指标仪表盘（简化版）
metrics = ['销售增长', '用户增长', '转化率', '满意度']
values = [15.3, 8.7, 3.2, 4.5]
colors = ['green' if v > 10 else 'orange' if v > 5 else 'red' for v in values]
bars = axes[0, 1].bar(metrics, values, color=colors, alpha=0.7)
axes[0, 1].set_title('关键指标概览')
axes[0, 1].set_ylabel('数值')
for bar, value in zip(bars, values):
    axes[0, 1].text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1, 
                    f'{value}', ha='center', va='bottom')

# 3. 业务占比饼图
business_units = ['产品销售', '服务收入', '订阅收入', '其他']
revenue_share = [45, 25, 20, 10]
axes[1, 0].pie(revenue_share, labels=business_units, autopct='%1.1f%%', startangle=90)
axes[1, 0].set_title('收入构成')

# 4. 健康度评分（模拟仪表盘）
health_score = 85
theta = np.linspace(0, np.pi, 100)
r = 1
axes[1, 1].plot(r * np.cos(theta), r * np.sin(theta), 'k-', linewidth=3)
axes[1, 1].fill_between(r * np.cos(theta[:50]), r * np.sin(theta[:50]), 
                        alpha=0.3, color='green')
axes[1, 1].set_title(f'业务健康度: {health_score}%')
axes[1, 1].set_xlim(-1.5, 1.5)
axes[1, 1].set_ylim(-0.5, 1.5)
axes[1, 1].axis('off')

plt.tight_layout()
plt.show()
`,
    knowledgePoints: [
      {
        title: '什么是业务仪表盘',
        content: '业务仪表盘（Business Dashboard）是将企业关键业务指标（KPI）以可视化的方式集中展示的工具，帮助管理者快速了解业务状况，及时发现问题和机会。',
        color: 'blue'
      },
      {
        title: '核心概念：KPI（关键绩效指标）',
        content: 'KPI是衡量业务绩效的关键指标，应具备SMART特性：具体（Specific）、可衡量（Measurable）、可达成（Achievable）、相关（Relevant）、有时限（Time-bound）。',
        color: 'green'
      },
      {
        title: '设计原则：信息层次',
        content: '好的仪表盘应遵循信息层次原则：顶层展示最关键的summary指标，中层展示趋势和对比，底层展示详细数据。用户可以根据需要深入探索。',
        color: 'amber'
      },
      {
        title: '设计原则：可视化选择',
        content: '根据数据类型选择合适的图表：趋势用折线图、构成用饼图/堆叠图、对比用柱状图、分布用直方图/箱线图、相关性用散点图。避免图表滥用。',
        color: 'purple'
      },
      {
        title: '技术实现：数据联动',
        content: '高级仪表盘支持数据联动：点击一个图表的元素，其他图表自动筛选相关数据。这种交互设计帮助用户从不同角度分析同一问题。',
        color: 'pink'
      },
      {
        title: '应用场景：管理决策',
        content: '业务仪表盘是管理决策的重要工具：晨会时快速回顾昨日业绩，周会时分析趋势变化，月度复盘时评估目标达成，战略规划时识别机会和风险。',
        color: 'indigo'
      }
    ]
  }
};

// 颜色映射
const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  green: 'bg-green-50 border-green-200 text-green-800',
  amber: 'bg-amber-50 border-amber-200 text-amber-800',
  purple: 'bg-purple-50 border-purple-200 text-purple-800',
  pink: 'bg-pink-50 border-pink-200 text-pink-800',
  indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800'
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.level === 'beginner' ? 'bg-green-100 text-green-800' : 
                  project.level === 'intermediate' ? 'bg-blue-100 text-blue-800' : 
                  'bg-amber-100 text-amber-800'
                }`}>
                  {project.level === 'beginner' ? '基础' : project.level === 'intermediate' ? '中级' : '高级'}
                </span>
                <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
            </div>
            <Link to="/projects" className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold text-sm">
              返回项目列表
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content - 左右布局 */}
      <section className="py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Column - 项目描述和任务要求 */}
            <div className="space-y-6">
              {/* 项目描述 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 text-sm">📋</span>
                  项目描述
                </h2>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>

              {/* 知识点模块 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-2 text-sm">📚</span>
                  知识点详解
                </h2>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {project.knowledgePoints.map((point, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg border-l-4 ${colorMap[point.color] || 'bg-gray-50 border-gray-200 text-gray-800'}`}
                    >
                      <h3 className="font-semibold mb-2 text-base">{point.title}</h3>
                      <p className="text-sm leading-relaxed opacity-90">{point.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 任务要求 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 text-sm">✓</span>
                  任务要求
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">{project.task}</pre>
                </div>
              </div>
            </div>
            
            {/* Right Column - 代码编辑器和AI陪练 */}
            <div className="space-y-6">
              {/* 代码编辑器 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2 text-sm">💻</span>
                    代码编辑器
                  </h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleRunCode}
                      disabled={isRunning}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 flex items-center gap-2 text-sm"
                    >
                      {isRunning ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          运行中
                        </>
                      ) : (
                        '运行代码'
                      )}
                    </button>
                    <button 
                      onClick={() => setCompleted(!completed)}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm ${completed ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                    >
                      {completed ? '已完成' : '标记完成'}
                    </button>
                  </div>
                </div>
                
                <div className="h-80 mb-4 border rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    defaultLanguage="python"
                    value={code}
                    onChange={(value) => value && setCode(value)}
                    options={{
                      minimap: { enabled: false },
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      fontSize: 13,
                      tabSize: 4,
                      automaticLayout: true
                    }}
                  />
                </div>
                
                {/* 运行结果 */}
                <div className="mt-4">
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">运行结果</h3>
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <pre className="whitespace-pre-wrap text-sm text-green-400 font-mono">{output || '点击"运行代码"查看结果...'}</pre>
                  </div>
                </div>
                
                {/* 图表 */}
                {figure && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2 text-gray-700">可视化图表</h3>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-center">
                      <img src={figure} alt="图表" className="max-w-full h-auto" />
                    </div>
                  </div>
                )}
              </div>

              {/* AI陪练 */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-2 text-sm">🤖</span>
                  AI陪练
                </h2>
                <div className="space-y-4">
                  <div className="h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg mb-4 border">
                    {chatMessages.length === 0 && (
                      <div className="text-center text-gray-400 py-8">
                        <p>👋 你好！我是你的AI学习助手</p>
                        <p className="text-sm mt-2">有任何问题都可以问我，比如：</p>
                        <ul className="text-sm mt-1 space-y-1">
                          <li>"这个代码是什么意思？"</li>
                          <li>"我卡住了，给我点提示"</li>
                          <li>"帮我检查一下代码错误"</li>
                        </ul>
                      </div>
                    )}
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block max-w-[85%] p-3 rounded-lg text-sm ${
                          msg.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isAICalling && (
                      <div className="text-left">
                        <div className="inline-block max-w-[85%] p-3 rounded-lg bg-gray-100 text-gray-800 text-sm">
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            AI正在思考...
                          </span>
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
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={isAICalling}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 text-sm"
                    >
                      发送
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
