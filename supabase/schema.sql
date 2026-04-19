-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  difficulty TEXT,
  instructor_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Course enrollments table
CREATE TABLE course_enrollments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  enrolled_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  content TEXT,
  order_number INTEGER,
  video_url TEXT,
  reading_material TEXT
);

-- Exercises table
CREATE TABLE exercises (
  id UUID PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id),
  title TEXT NOT NULL,
  description TEXT,
  difficulty TEXT,
  test_cases JSONB,
  solution TEXT
);

-- Exercise submissions table
CREATE TABLE exercise_submissions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  exercise_id UUID REFERENCES exercises(id),
  code TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT NOW(),
  passed BOOLEAN,
  feedback TEXT
);

-- Assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY,
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  description TEXT,
  questions JSONB,
  passing_score INTEGER
);

-- Progress table
CREATE TABLE progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP
);

-- Achievement types table
CREATE TABLE achievement_types (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  requirement JSONB
);

-- Achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  achievement_type_id UUID REFERENCES achievement_types(id),
  earned_at TIMESTAMP DEFAULT NOW()
);

-- Permissions
GRANT SELECT ON ALL TABLES TO anon;
GRANT ALL PRIVILEGES ON ALL TABLES TO authenticated;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public can view courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Instructors can create courses" ON courses FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'instructor');

CREATE POLICY "Users can view own enrollments" ON course_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can enroll in courses" ON course_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can view lessons" ON lessons FOR SELECT USING (true);

CREATE POLICY "Public can view exercises" ON exercises FOR SELECT USING (true);
CREATE POLICY "Users can submit exercises" ON exercise_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view own submissions" ON exercise_submissions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Public can view assessments" ON assessments FOR SELECT USING (true);

CREATE POLICY "Users can view own progress" ON progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Public can view achievement types" ON achievement_types FOR SELECT USING (true);
CREATE POLICY "Users can view own achievements" ON achievements FOR SELECT USING (auth.uid() = user_id);

-- Initial data for achievement types
INSERT INTO achievement_types (id, name, description, icon, requirement)
VALUES
  (gen_random_uuid(), 'Python初学者', '完成Python基础入门课程', '🐍', '{"course_id": "python-basics", "completed": true}'),
  (gen_random_uuid(), '数据可视化师', '完成数据可视化基础课程', '📊', '{"course_id": "data-visualization", "completed": true}'),
  (gen_random_uuid(), '商务分析师', '完成商务数据分析方法课程', '💼', '{"course_id": "business-analysis", "completed": true}'),
  (gen_random_uuid(), '机器学习入门', '完成机器学习基础课程', '🤖', '{"course_id": "machine-learning", "completed": true}'),
  (gen_random_uuid(), '学习达人', '累计学习时间超过20小时', '🏆', '{"total_hours": 20}'),
  (gen_random_uuid(), '练习大师', '完成50个以上的练习', '🎯', '{"total_exercises": 50}');

-- Initial data for courses
INSERT INTO courses (id, title, description, category, difficulty, instructor_id)
VALUES
  (gen_random_uuid(), 'Python基础入门', '掌握Python编程基础，为数据分析打下坚实基础', 'Python基础', '初级', (SELECT id FROM users WHERE role = 'instructor' LIMIT 1)),
  (gen_random_uuid(), '数据可视化基础', '学习如何将数据转化为直观的图表和可视化', '数据可视化', '初级', (SELECT id FROM users WHERE role = 'instructor' LIMIT 1)),
  (gen_random_uuid(), '商务数据分析方法', '应用数据分析技术解决商务问题', '商务数据分析', '中级', (SELECT id FROM users WHERE role = 'instructor' LIMIT 1)),
  (gen_random_uuid(), 'Python数据分析实战', '学习使用Python进行实际数据分析项目', 'Python基础', '中级', (SELECT id FROM users WHERE role = 'instructor' LIMIT 1)),
  (gen_random_uuid(), '数据可视化高级技巧', '学习使用Matplotlib和Seaborn创建专业数据可视化', '数据可视化', '中级', (SELECT id FROM users WHERE role = 'instructor' LIMIT 1)),
  (gen_random_uuid(), '机器学习基础', '了解机器学习基础，应用于数据分析', '机器学习', '高级', (SELECT id FROM users WHERE role = 'instructor' LIMIT 1));