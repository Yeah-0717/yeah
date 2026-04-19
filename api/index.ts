import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// Supabase配置
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'your-service-key';
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 用户认证API
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name }
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json({ user: data.user });
  } catch (err) {
    res.status(500).json({ error: '注册失败，请重试' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    
    res.status(200).json({ user: data.user, session: data.session });
  } catch (err) {
    res.status(500).json({ error: '登录失败，请重试' });
  }
});

app.post('/api/auth/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ message: '登出成功' });
  } catch (err) {
    res.status(500).json({ error: '登出失败，请重试' });
  }
});

app.get('/api/auth/me', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: '未授权' });
  }
  
  try {
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    
    res.status(200).json({ user: data.user });
  } catch (err) {
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

// 课程管理API
app.get('/api/courses', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*');
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ courses: data });
  } catch (err) {
    res.status(500).json({ error: '获取课程失败' });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(404).json({ error: '课程不存在' });
    }
    
    res.status(200).json({ course: data });
  } catch (err) {
    res.status(500).json({ error: '获取课程失败' });
  }
});

app.post('/api/courses', async (req, res) => {
  const { title, description, category, difficulty, instructor_id } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('courses')
      .insert({
        title,
        description,
        category,
        difficulty,
        instructor_id
      })
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(201).json({ course: data });
  } catch (err) {
    res.status(500).json({ error: '创建课程失败' });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, category, difficulty } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('courses')
      .update({
        title,
        description,
        category,
        difficulty
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ course: data });
  } catch (err) {
    res.status(500).json({ error: '更新课程失败' });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ message: '课程删除成功' });
  } catch (err) {
    res.status(500).json({ error: '删除课程失败' });
  }
});

// 进度跟踪API
app.get('/api/progress', async (req, res) => {
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: '缺少用户ID' });
  }
  
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user_id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ progress: data });
  } catch (err) {
    res.status(500).json({ error: '获取进度失败' });
  }
});

app.post('/api/progress', async (req, res) => {
  const { user_id, lesson_id, completed } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        user_id,
        lesson_id,
        completed,
        completed_at: completed ? new Date().toISOString() : null
      })
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ progress: data });
  } catch (err) {
    res.status(500).json({ error: '更新进度失败' });
  }
});

app.get('/api/achievements', async (req, res) => {
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: '缺少用户ID' });
  }
  
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*, achievement_types(*)')
      .eq('user_id', user_id);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ achievements: data });
  } catch (err) {
    res.status(500).json({ error: '获取成就失败' });
  }
});

// 练习提交API
app.post('/api/exercises/:id/submit', async (req, res) => {
  const { id } = req.params;
  const { user_id, code } = req.body;
  
  try {
    // 获取练习信息
    const { data: exercise, error: exerciseError } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', id)
      .single();
    
    if (exerciseError) {
      return res.status(404).json({ error: '练习不存在' });
    }
    
    // 简单的代码验证逻辑（实际项目中可能需要更复杂的验证）
    let passed = false;
    let feedback = '';
    
    // 这里可以添加代码执行和验证逻辑
    // 例如使用沙箱环境执行代码并检查结果
    
    // 模拟验证
    if (code.includes('print(')) {
      passed = true;
      feedback = '代码执行成功！';
    } else {
      passed = false;
      feedback = '代码缺少print语句，请检查';
    }
    
    // 保存提交记录
    const { data, error } = await supabase
      .from('exercise_submissions')
      .insert({
        user_id,
        exercise_id: id,
        code,
        passed,
        feedback
      })
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.status(200).json({ submission: data });
  } catch (err) {
    res.status(500).json({ error: '提交练习失败' });
  }
});

app.get('/api/exercises/:id/feedback', async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.query;
  
  if (!user_id) {
    return res.status(400).json({ error: '缺少用户ID' });
  }
  
  try {
    const { data, error } = await supabase
      .from('exercise_submissions')
      .select('*')
      .eq('exercise_id', id)
      .eq('user_id', user_id)
      .order('submitted_at', { ascending: false })
      .single();
    
    if (error) {
      return res.status(404).json({ error: '没有找到提交记录' });
    }
    
    res.status(200).json({ feedback: data });
  } catch (err) {
    res.status(500).json({ error: '获取反馈失败' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;