import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { Button, Card, Icon } from '../ui';

// Validation schema
const registerSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
  marketingEmails: yup.boolean().default(false),
});

// Form data type
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  marketingEmails: boolean;
}

// Props interface
interface RegisterFormProps {
  onSubmit: (data: Omit<RegisterFormData, 'confirmPassword' | 'acceptTerms'>) => Promise<void>;
  onSignIn?: () => void;
  onTermsClick?: () => void;
  onPrivacyClick?: () => void;
  isLoading?: boolean;
  error?: string;
}

// Password strength checker
const getPasswordStrength = (password: string): { score: number; label: string; color: string } => {
  if (!password) return { score: 0, label: '', color: '' };
  
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score < 3) return { score, label: 'Weak', color: '#EF4444' };
  if (score < 5) return { score, label: 'Medium', color: '#F59E0B' };
  return { score, label: 'Strong', color: '#10B981' };
};

// Styled components
const FormContainer = styled(Card)`
  max-width: 480px;
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
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

const PasswordStrengthIndicator = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const StrengthMeter = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StrengthBar = styled.div<{ isActive: boolean; color: string }>`
  height: 4px;
  flex: 1;
  border-radius: 2px;
  background: ${({ isActive, color }) => isActive ? color : '#E5E7EB'};
  transition: all ${({ theme }) => theme.animations.duration.normal};
`;

const StrengthLabel = styled.span<{ color: string }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ color }) => color};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
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

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.gray300};
  cursor: pointer;
  margin-top: 2px;
  flex-shrink: 0;

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary.brand};
    border-color: ${({ theme }) => theme.colors.primary.brand};
  }
`;

const CheckboxLabel = styled.label<{ hasError?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ hasError, theme }) => 
    hasError ? theme.colors.semantic.error : theme.colors.neutrals.gray600};
  cursor: pointer;
  line-height: 1.4;
`;

const TermsLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.brand};
  cursor: pointer;
  padding: 0;
  text-decoration: underline;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.brandDark};
  }
`;

const SubmitButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SignInPrompt = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.neutrals.gray100};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutrals.gray600};
`;

const SignInLink = styled.button`
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

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  onSignIn,
  onTermsClick,
  onPrivacyClick,
  isLoading = false,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      marketingEmails: false,
    },
  });

  const password = watch('password');
  const passwordStrength = getPasswordStrength(password);

  const handleFormSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, acceptTerms, ...submitData } = data;
      await onSubmit(submitData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <FormContainer padding="xl">
      <FormHeader>
        <Title>Create Account</Title>
        <Subtitle>Join us today and start managing your finances</Subtitle>
      </FormHeader>

      {error && (
        <GlobalError>
          <Icon name="fas fa-exclamation-circle" size="sm" />
          {error}
        </GlobalError>
      )}

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              hasError={!!errors.firstName}
              {...register('firstName')}
            />
            {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              hasError={!!errors.lastName}
              {...register('lastName')}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
          </FormGroup>
        </FormRow>

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
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Choose a username"
            hasError={!!errors.username}
            {...register('username')}
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <InputWrapper>
            <PasswordInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              hasError={!!errors.password}
              {...register('password')}
            />
            <PasswordToggle
              type="button"
              onClick={() => togglePasswordVisibility('password')}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} size="sm" />
            </PasswordToggle>
          </InputWrapper>
          
          {password && (
            <PasswordStrengthIndicator>
              <StrengthMeter>
                {Array.from({ length: 4 }, (_, i) => (
                  <StrengthBar
                    key={i}
                    isActive={i < Math.ceil(passwordStrength.score / 1.5)}
                    color={passwordStrength.color}
                  />
                ))}
              </StrengthMeter>
              <StrengthLabel color={passwordStrength.color}>
                {passwordStrength.label}
              </StrengthLabel>
            </PasswordStrengthIndicator>
          )}
          
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <InputWrapper>
            <PasswordInput
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              hasError={!!errors.confirmPassword}
              {...register('confirmPassword')}
            />
            <PasswordToggle
              type="button"
              onClick={() => togglePasswordVisibility('confirmPassword')}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              <Icon name={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} size="sm" />
            </PasswordToggle>
          </InputWrapper>
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <CheckboxWrapper>
            <Checkbox
              id="acceptTerms"
              type="checkbox"
              {...register('acceptTerms')}
            />
            <CheckboxLabel htmlFor="acceptTerms" hasError={!!errors.acceptTerms}>
              I agree to the{' '}
              <TermsLink type="button" onClick={onTermsClick}>
                Terms of Service
              </TermsLink>
              {' '}and{' '}
              <TermsLink type="button" onClick={onPrivacyClick}>
                Privacy Policy
              </TermsLink>
            </CheckboxLabel>
          </CheckboxWrapper>
          {errors.acceptTerms && <ErrorMessage>{errors.acceptTerms.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <CheckboxWrapper>
            <Checkbox
              id="marketingEmails"
              type="checkbox"
              {...register('marketingEmails')}
            />
            <CheckboxLabel htmlFor="marketingEmails">
              I would like to receive marketing emails and updates
            </CheckboxLabel>
          </CheckboxWrapper>
        </FormGroup>

        <SubmitButton
          type="submit"
          fullWidth
          disabled={isLoading || isSubmitting}
        >
          {isLoading || isSubmitting ? (
            <>
              <Icon name="fas fa-spinner" size="sm" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </SubmitButton>
      </Form>

      {onSignIn && (
        <SignInPrompt>
          Already have an account?
          <SignInLink type="button" onClick={onSignIn}>
            Sign in
          </SignInLink>
        </SignInPrompt>
      )}
    </FormContainer>
  );
};