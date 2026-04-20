import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  }, [navigate]); // ✅ added dependency

  const handleGoogle = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div>
      <button onClick={handleGoogle}>
        Continue with Google
      </button>
    </div>
  );
}