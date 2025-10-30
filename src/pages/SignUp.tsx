// src/pages/Signup.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with actual signup logic
    try {
      const response = await fetch('https://manga.asfischolar.org/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:name, email, password }),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      const data = await response.json();
      // Assuming the API returns user data on successful signup
      localStorage.setItem('user', JSON.stringify(data));   
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pr-10"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-creative-primary hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;