import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';
import { Spinner } from '../components/common/Spinner';

export function Login() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-bold text-cyan-400 mb-6 text-center">
          TropelCare Control Room
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
