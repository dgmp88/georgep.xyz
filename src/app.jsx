import { Routes, Route } from 'react-router-dom';

import { Header } from './components/header';
import { Home } from './pages/home';
import { Blog } from './pages/blog';

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
    </>
  );
}

export default App;
