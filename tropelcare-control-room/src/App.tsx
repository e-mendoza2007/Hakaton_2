import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Layout } from './components/common/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Tropels } from './pages/Tropels';
import { Signals } from './pages/Signals';
import { Sectors } from './pages/Sectors';
import { SectorStory } from './pages/SectorStory';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/tropels" element={<Tropels />} />
        <Route path="/signals" element={<Signals />} />
        <Route path="/sectors" element={<Sectors />} />
        <Route path="/sectors/:id/story" element={<SectorStory />} />
      </Route>
    </Routes>
  );
}
