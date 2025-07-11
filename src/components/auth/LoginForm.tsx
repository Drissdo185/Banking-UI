import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Card, Icon } from '../ui';

// Validation schema
const loginSchema = yup.object({
  emailOrUsername: yup
    .string()
    .required('Email or username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  rememberMe: yup.boolean().default(false),
});

// Form data type
type LoginFormData = yup.InferType<typeof loginSchema>;

// Props interface
interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onForgotPassword?: () => void;
  onSignUp?: () => void;
  isLoading?: boolean;
  error?: string | null;
}


export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  isLoading = false,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      emailOrUsername: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleFormSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Error handling is managed by parent component
      console.error('Login error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card padding="xl" className="max-w-md mx-auto bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
        <p className="text-gray-500 text-base">Sign in to your account to continue</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm mb-6 flex items-center gap-2">
          <Icon name="fas fa-exclamation-circle" size="sm" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="emailOrUsername" className="text-sm font-medium text-gray-700">
            Email or Username
          </label>
          <input
            id="emailOrUsername"
            type="text"
            placeholder="Enter your email or username"
            className={`w-full px-6 py-4 border rounded-lg text-base bg-white text-gray-800 transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:border-primary-brand focus:shadow-[0_0_0_3px_rgba(0,166,147,0.1)] ${
              errors.emailOrUsername ? 'border-red-500' : 'border-gray-200'
            }`}
            {...register('emailOrUsername')}
          />
          {errors.emailOrUsername && (
            <span className="text-red-500 text-sm mt-1">{errors.emailOrUsername.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`w-full px-6 py-4 pr-12 border rounded-lg text-base bg-white text-gray-800 transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:border-primary-brand focus:shadow-[0_0_0_3px_rgba(0,166,147,0.1)] ${
                errors.password ? 'border-red-500' : 'border-gray-200'
              }`}
              {...register('password')}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-none border-none text-gray-400 cursor-pointer p-2 hover:text-gray-600"
            >
              <Icon name={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} size="sm" />
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              id="rememberMe"
              type="checkbox"
              className="w-4 h-4 rounded-sm border border-gray-300 cursor-pointer checked:bg-primary-brand checked:border-primary-brand"
              {...register('rememberMe')}
            />
            <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
              Remember me
            </label>
          </div>
          
          {onForgotPassword && (
            <button 
              type="button" 
              onClick={onForgotPassword}
              className="bg-none border-none text-primary-brand text-sm cursor-pointer p-0 hover:underline"
            >
              Forgot password?
            </button>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={isLoading || isSubmitting}
          className="mt-4"
        >
          {isLoading || isSubmitting ? (
            <>
              <Icon name="fas fa-spinner" size="sm" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      {onSignUp && (
        <div className="text-center mt-8 pt-8 border-t border-gray-100 text-sm text-gray-600">
          Don't have an account?
          <button 
            type="button" 
            onClick={onSignUp}
            className="bg-none border-none text-primary-brand font-medium cursor-pointer ml-1 hover:underline"
          >
            Sign up
          </button>
        </div>
      )}
    </Card>
  );
};