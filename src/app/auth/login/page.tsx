"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      // Redirect to home page after successful login
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Aviation-themed background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-gray-50 opacity-80"></div>
        <img 
          src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=80" 
          alt="Clouds from airplane window" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute top-20 left-10 w-20 h-20 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-900">
            <path d="M10.5 18.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" />
            <path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 005.25 4.125v15.75a3.375 3.375 0 003.375 3.375h6.75a3.375 3.375 0 003.375-3.375V4.125A3.375 3.375 0 0015.375.75h-6.75zM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 017.5 19.875V4.125z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-900">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </div>
      </div>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl relative z-10 border border-gray-100">
        <div>
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center p-4 border-4 border-blue-50 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-600">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ready to fly again? Or{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              create a new account
            </Link>
          </p>
          
          {/* Mock credentials notice - remove in production */}
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-xs text-center text-yellow-700">
              <strong>Demo Mode:</strong> Use these credentials to sign in<br />
              Email: <span className="font-mono">test@example.com</span><br />
              Password: <span className="font-mono">password</span>
            </p>
          </div>
        </div>
        
        {/* Social login options */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Sign in with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => setError('Social sign-in will be available soon!')}
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </button>
            </div>

            <div>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => setError('Social sign-in will be available soon!')}
              >
                <span className="sr-only">Sign in with Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => setError('Social sign-in will be available soon!')}
              >
                <span className="sr-only">Sign in with Apple</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.146 0c.66.028 1.465.178 2.414.401a5.36 5.36 0 0 1 1.095.386c.268.127.519.265.752.415a5.97 5.97 0 0 1 .645.458c.292.238.557.5.785.787.229.287.414.594.56.92.145.326.249.67.31 1.03.06.36.08.736.057 1.127-.023.391-.089.786-.196 1.186a6.004 6.004 0 0 1-.36 1.08 6.345 6.345 0 0 1-.492.972c-.187.308-.39.598-.607.87-.217.272-.446.526-.686.76-.24.235-.49.45-.747.644-.258.194-.52.368-.788.519-.267.15-.537.28-.81.386-.272.106-.544.19-.815.249-.27.06-.54.094-.805.102a4.761 4.761 0 0 1-.796-.056 5.972 5.972 0 0 1-.776-.18 6.487 6.487 0 0 1-.75-.28 7.053 7.053 0 0 1-.717-.36 5.295 5.295 0 0 0-.696.36 6.308 6.308 0 0 0-.67.446 6.327 6.327 0 0 0-.626.517 6.326 6.326 0 0 0-.57.572 6.356 6.356 0 0 0-.493.611 6.372 6.372 0 0 0-.403.634 6.37 6.37 0 0 0-.298.642 6.306 6.306 0 0 0-.18.634 6.17 6.17 0 0 0-.05.611 6.01 6.01 0 0 0 .09.57c.04.188.094.37.164.547.07.177.153.347.25.51.097.163.207.318.33.464.123.146.258.283.404.41.146.127.304.244.471.35.167.106.343.2.527.282.184.082.374.152.57.21.196.058.396.104.6.137.204.033.412.053.622.06.21.007.42 0 .63-.02.21-.02.418-.053.624-.1.206-.047.409-.107.607-.18.198-.073.392-.16.58-.26.188-.1.37-.213.545-.34.175-.127.343-.267.502-.42.16-.153.31-.32.45-.5.14-.18.27-.373.386-.58.117-.207.22-.427.307-.66.087-.233.157-.48.21-.74.053-.26.09-.533.107-.82.017-.287.017-.587 0-.9a8.294 8.294 0 0 0-.107-.9 8.334 8.334 0 0 0-.21-.88 8.353 8.353 0 0 0-.307-.85 8.39 8.39 0 0 0-.386-.81 8.39 8.39 0 0 0-.45-.76 8.39 8.39 0 0 0-.502-.7 8.39 8.39 0 0 0-.545-.63 8.39 8.39 0 0 0-.58-.55 8.39 8.39 0 0 0-.607-.46 8.39 8.39 0 0 0-.624-.36 8.39 8.39 0 0 0-.63-.25 8.39 8.39 0 0 0-.622-.13 8.39 8.39 0 0 0-.6-.01 8.39 8.39 0 0 0-.57.11 8.39 8.39 0 0 0-.527.23 8.39 8.39 0 0 0-.471.35 8.39 8.39 0 0 0-.404.46 8.39 8.39 0 0 0-.33.56 8.39 8.39 0 0 0-.25.65 8.39 8.39 0 0 0-.164.73 8.39 8.39 0 0 0-.09.8c0 .273.017.543.05.81.033.267.083.53.15.787.067.257.15.507.25.75.1.243.217.48.35.707.133.227.283.443.45.647.167.203.35.393.55.57.2.177.417.34.65.487.233.147.483.28.75.397.267.117.55.22.85.307.3.087.617.16.95.217.333.057.683.1 1.05.127.367.027.75.04 1.15.04.4 0 .783-.013 1.15-.04.367-.027.717-.07 1.05-.127.333-.057.65-.13.95-.217.3-.087.583-.19.85-.307.267-.117.517-.25.75-.397.233-.147.45-.31.65-.487.2-.177.383-.367.55-.57.167-.203.317-.42.45-.647.133-.227.25-.463.35-.707.1-.243.183-.493.25-.75.067-.257.117-.52.15-.787.033-.267.05-.537.05-.81a5.84 5.84 0 0 0-.05-.61 5.915 5.915 0 0 0-.15-.59 5.916 5.916 0 0 0-.25-.56 5.916 5.916 0 0 0-.35-.52 5.916 5.916 0 0 0-.45-.47 5.916 5.916 0 0 0-.55-.41 5.916 5.916 0 0 0-.65-.34 5.916 5.916 0 0 0-.75-.26 5.916 5.916 0 0 0-.85-.17 5.916 5.916 0 0 0-.95-.06c-.333 0-.65.02-.95.06-.3.04-.567.097-.8.17a3.98 3.98 0 0 0-.65.26 3.98 3.98 0 0 0-.5.34 3.98 3.98 0 0 0-.35.41 3.98 3.98 0 0 0-.2.47c-.05.16-.083.327-.1.5a3.98 3.98 0 0 0 0 .52c.017.173.05.34.1.5.05.16.117.313.2.46.083.147.183.287.3.42.117.133.25.26.4.38.15.12.317.233.5.34.183.107.383.2.6.28.217.08.45.147.7.2.25.053.517.093.8.12.283.027.583.04.9.04.317 0 .617-.013.9-.04.283-.027.55-.067.8-.12.25-.053.483-.12.7-.2.217-.08.417-.173.6-.28.183-.107.35-.22.5-.34.15-.12.283-.247.4-.38.117-.133.217-.273.3-.42.083-.147.15-.3.2-.46.05-.16.083-.327.1-.5.017-.173.017-.347 0-.52a3.98 3.98 0 0 0-.1-.5 3.98 3.98 0 0 0-.2-.47 3.98 3.98 0 0 0-.3-.41 3.98 3.98 0 0 0-.4-.34 3.98 3.98 0 0 0-.5-.26 3.98 3.98 0 0 0-.6-.17 3.98 3.98 0 0 0-.7-.06c-.25 0-.483.02-.7.06-.217.04-.417.097-.6.17a2.31 2.31 0 0 0-.5.26 2.31 2.31 0 0 0-.4.34 2.31 2.31 0 0 0-.3.41 2.31 2.31 0 0 0-.2.47 2.31 2.31 0 0 0-.1.5 2.31 2.31 0 0 0 0 .52c.017.173.05.34.1.5.05.16.117.313.2.46.083.147.183.287.3.42.117.133.25.26.4.38.15.12.317.233.5.34.183.107.383.2.6.28.217.08.45.147.7.2.25.053.517.093.8.12.283.027.583.04.9.04.317 0 .617-.013.9-.04.283-.027.55-.067.8-.12.25-.053.483-.12.7-.2.217-.08.417-.173.6-.28.183-.107.35-.22.5-.34.15-.12.283-.247.4-.38.117-.133.217-.273.3-.42.083-.147.15-.3.2-.46.05-.16.083-.327.1-.5.017-.173.017-.347 0-.52a3.98 3.98 0 0 0-.1-.5 3.98 3.98 0 0 0-.2-.47 3.98 3.98 0 0 0-.3-.41 3.98 3.98 0 0 0-.4-.34 3.98 3.98 0 0 0-.5-.26 3.98 3.98 0 0 0-.6-.17 3.98 3.98 0 0 0-.7-.06" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign in with email</span>
          </div>
        </div>
        
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-blue-500 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
