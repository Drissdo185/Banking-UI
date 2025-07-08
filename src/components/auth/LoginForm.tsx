import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Button, Card, Icon } from '../ui';

// Validation schema
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
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
  error?: string;
}

// Styled components
const FormContainer = styled(Card)`
  max-width: 400px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.neutrals.white};
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.neutrals.gray500};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutrals.gray700};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border: 1px solid ${({ hasError, theme }) => 
    hasError ? theme.colors.semantic.error : theme.colors.neutrals.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  background: ${({ theme }) => theme.colors.neutrals.white};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.brand};
    box-shadow: 0 0 0 3px rgba(0, 166, 147, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutrals.gray400};
  }
`;

const PasswordInput = styled(Input)`
  padding-right: 3rem;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutrals.gray400};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.neutrals.gray600};
  }
`;

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.semantic.error};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const GlobalError = styled.div`
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: ${({ theme }) => theme.colors.semantic.error};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const RememberMeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.gray300};
  cursor: pointer;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary.brand};
    border-color: ${({ theme }) => theme.colors.primary.brand};
  }
`;

const CheckboxLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutrals.gray600};
  cursor: pointer;
`;

const ForgotPasswordLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.brand};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SignUpPrompt = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.neutrals.gray100};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutrals.gray600};
`;

const SignUpLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.brand};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.xs};

  &:hover {
    text-decoration: underline;
  }
`;

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
      email: '',
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
    <FormContainer padding="xl">
      <FormHeader>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to your account to continue</Subtitle>
      </FormHeader>

      {error && (
        <GlobalError>
          <Icon name="fas fa-exclamation-circle" size="sm" />
          {error}
        </GlobalError>
      )}

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            hasError={!!errors.email}
            {...register('email')}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <InputWrapper>
            <PasswordInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              hasError={!!errors.password}
              {...register('password')}
            />
            <PasswordToggle
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} size="sm" />
            </PasswordToggle>
          </InputWrapper>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>

        <RememberMeWrapper>
          <CheckboxWrapper>
            <Checkbox
              id="rememberMe"
              type="checkbox"
              {...register('rememberMe')}
            />
            <CheckboxLabel htmlFor="rememberMe">Remember me</CheckboxLabel>
          </CheckboxWrapper>
          
          {onForgotPassword && (
            <ForgotPasswordLink type="button" onClick={onForgotPassword}>
              Forgot password?
            </ForgotPasswordLink>
          )}
        </RememberMeWrapper>

        <SubmitButton
          type="submit"
          fullWidth
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? (
            <>
              <Icon name="fas fa-spinner" size="sm" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </SubmitButton>
      </Form>

      {onSignUp && (
        <SignUpPrompt>
          Don't have an account?
          <SignUpLink type="button" onClick={onSignUp}>
            Sign up
          </SignUpLink>
        </SignUpPrompt>
      )}
    </FormContainer>
  );
};