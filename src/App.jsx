import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Intro from './pages/Intro';
import Sets from './pages/Sets';
import Parts from './pages/Parts';
import Help from './pages/Help'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Intro />} />
        <Route path="sets" element={<Sets />} />
        <Route path="parts" element={<Parts />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
}

export default App;