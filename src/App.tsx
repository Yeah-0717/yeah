import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LearningGuide from './pages/LearningGuide';
import ThinkingModel from './pages/ThinkingModel';
import Controversy from './pages/Controversy';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learning-guide" element={<LearningGuide />} />
          <Route path="/thinking-model" element={<ThinkingModel />} />
          <Route path="/controversy" element={<Controversy />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;