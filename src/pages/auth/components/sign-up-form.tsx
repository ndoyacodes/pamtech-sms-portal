import { useState, FC } from 'react';
import {
  User, Building2, Mail, Globe, Phone, Check, Upload, Languages,
  Shield, UserCircle, Building, Eye, EyeOff, ArrowRight, ArrowLeft, LucideIcon
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom'

const formSchema = z
  .object({
    email: z.string().min(1, { message: 'Email is required' }).email('Invalid email format'),
    password: z.string().min(7, { message: 'Password must be at least 7 characters' }),
    confirmPassword: z.string(),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    timezone: z.string().min(1, { message: 'Timezone is required' }),
    language: z.string().min(1, { message: 'Language is required' }),
    companyName: z.string().min(1, { message: 'Company name is required' }),
    website: z.string().url({ message: 'Invalid website URL' }).or(z.literal('')),
    customerType: z.enum(['POSTPAID', 'PREPAID'], { message: 'Customer type is required' }),
    countryCode: z.string().min(1, { message: 'Country code is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    kycFile: typeof window === 'undefined' ? z.any().optional() : z.instanceof(File).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

interface StepIndicatorProps {
  stepNumber: number;
  currentStep: number;
  title: string;
  icon: LucideIcon;
}

const StepIndicator: FC<StepIndicatorProps> = ({ stepNumber, currentStep, title, icon: Icon }) => {
  const isCompleted = currentStep > stepNumber;
  const isActive = currentStep === stepNumber;

  return (
    <div className="flex items-center relative">
      <div className="flex flex-col items-center">
        <div
          className={`
            flex h-14 w-14 items-center justify-center rounded-full border-2
            transition-all duration-700 ease-out transform hover:scale-105
            ${isActive ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-200' : ''}
            ${isCompleted ? 'border-green-500 bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-200' : ''}
            ${!isActive && !isCompleted ? 'border-gray-200 bg-white text-gray-400 shadow-sm' : ''}
          `}
        >
          {isCompleted ? (
            <Check className="h-6 w-6 animate-in zoom-in-50" />
          ) : (
            <Icon className="h-6 w-6" />
          )}
        </div>
        <div className="mt-3">
          <span
            className={`text-sm font-medium transition-colors duration-300
              ${isActive ? 'text-blue-600 font-semibold' : ''}
              ${isCompleted ? 'text-green-600' : ''}
              ${!isActive && !isCompleted ? 'text-gray-400' : ''}
            `}
          >
            {title}
          </span>
        </div>
      </div>
      {stepNumber < 4 && (
        <div
          className={`
            h-1 w-24 mx-4 rounded-full transition-all duration-700 ease-out
            ${isCompleted ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gray-200'}
          `}
        />
      )}
    </div>
  );
};

export const SignUpForm: FC = () => {
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      timezone: '',
      language: '',
      companyName: '',
      website: '',
      customerType: 'POSTPAID',
      countryCode: '',
      phoneNumber: '',
      kycFile: null,
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    trigger,
    register,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const timezones: string[] = [
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai', 'Africa/Dar_es_Salaam'
  ];

  const validateStep = async (): Promise<boolean> => {
    const fieldsToValidate: (keyof FormData)[] = [];
    switch (step) {
      case 1:
        fieldsToValidate.push('email', 'password', 'confirmPassword');
        break;
      case 2:
        fieldsToValidate.push('firstName', 'lastName', 'countryCode', 'phoneNumber');
        break;
      case 3:
        fieldsToValidate.push('companyName', 'customerType', 'website');
        break;
      case 4:
        fieldsToValidate.push('language', 'timezone', 'kycFile');
        break;
    }
    return await trigger(fieldsToValidate);
  };

  const nextStep = async (): Promise<void> => {
    const isValid = await validateStep();
    if (isValid) {
      setStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = (): void => setStep(prev => Math.max(prev - 1, 1));

  const onFormSubmit = async (data: FormData): Promise<void> => {
    console.log('Form data ready for submission:', data);

    const apiFormData = new FormData();

    for (const key in data) {
      if (key !== 'kycFile' && data[key as keyof FormData] !== null) {
        apiFormData.append(key, String(data[key as keyof FormData]));
      }
    }

    if (data.kycFile) {
      apiFormData.append('kycFile', data.kycFile);
    }

    try {
      console.log('Sending data to API:', apiFormData);
      alert('Account created successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      setError('root.serverError', {
        type: 'manual',
        message: 'A network error occurred. Please try again.',
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className={`
                    w-full pl-11 pr-4 py-3 rounded-xl border-2
                    transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                    ${errors.email
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                  }
                  `}
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative group">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Create a strong password"
                  className={`
                    w-full pl-11 pr-11 py-3 rounded-xl border-2
                    transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                    ${errors.password
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                  }
                  `}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative group">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className={`
                    w-full pl-11 pr-11 py-3 rounded-xl border-2
                    transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                    ${errors.confirmPassword
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                  }
                  `}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    id="firstName"
                    placeholder="John"
                    className={`
                      w-full pl-11 pr-4 py-3 rounded-xl border-2
                      transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                      ${errors.firstName
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                    }
                    `}
                    {...register('firstName')}
                  />
                </div>
                {errors.firstName && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Doe"
                    className={`
                      w-full pl-11 pr-4 py-3 rounded-xl border-2
                      transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                      ${errors.lastName
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                    }
                    `}
                    {...register('lastName')}
                  />
                </div>
                {errors.lastName && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="countryCode" className="text-sm font-medium text-gray-700">Country Code</label>
                <div className="relative group">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    id="countryCode"
                    placeholder="+1"
                    className={`
                      w-full pl-11 pr-4 py-3 rounded-xl border-2
                      transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                      ${errors.countryCode
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                    }
                    `}
                    {...register('countryCode')}
                  />
                </div>
                {errors.countryCode && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.countryCode.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    id="phoneNumber"
                    placeholder="(555) 000-0000"
                    className={`
                      w-full pl-11 pr-4 py-3 rounded-xl border-2
                      transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                      ${errors.phoneNumber
                      ? 'border-red-300 bg-red-50 focus:border-red-500'
                      : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                    }
                    `}
                    {...register('phoneNumber')}
                  />
                </div>
                {errors.phoneNumber && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.phoneNumber.message}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-5">
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</label>
              <div className="relative group">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  id="companyName"
                  placeholder="Your Company Ltd."
                  className={`
                    w-full pl-11 pr-4 py-3 rounded-xl border-2
                    transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                    ${errors.companyName
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                  }
                  `}
                  {...register('companyName')}
                />
              </div>
              {errors.companyName && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.companyName.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium text-gray-700">Website (Optional)</label>
              <div className="relative group">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  id="website"
                  placeholder="https://example.com"
                  className={`
                    w-full pl-11 pr-4 py-3 rounded-xl border-2
                    transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100
                    ${errors.website
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300'
                  }
                  `}
                  {...register('website')}
                />
              </div>
              {errors.website && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.website.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="customerType" className="text-sm font-medium text-gray-700">Account Type</label>
              <select
                id="customerType"
                className={`
                  w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                  focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white
                  ${errors.customerType
                  ? 'border-red-300 bg-red-50 focus:border-red-500'
                  : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                }
                `}
                {...register('customerType')}
              >
                <option value="">Select account type</option>
                <option value="POSTPAID">Postpaid</option>
                <option value="PREPAID">Prepaid</option>
              </select>
              {errors.customerType && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.customerType.message}</p>}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-in slide-in-from-right-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="language" className="text-sm font-medium text-gray-700">Language</label>
                <select
                  id="language"
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white
                    ${errors.language
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }
                  `}
                  {...register('language')}
                >
                  <option value="">Select language</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
                {errors.language && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.language.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="timezone" className="text-sm font-medium text-gray-700">Timezone</label>
                <select
                  id="timezone"
                  className={`
                    w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white
                    ${errors.timezone
                    ? 'border-red-300 bg-red-50 focus:border-red-500'
                    : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                  }
                  `}
                  {...register('timezone')}
                >
                  <option value="">Select timezone</option>
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
                {errors.timezone && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors.timezone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="kycFile" className="text-sm font-medium text-gray-700">KYC Document (Optional)</label>
              <div className="relative group">
                <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="file"
                  id="kycFile"
                  accept="application/pdf"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-blue-500 hover:border-gray-300 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  {...register('kycFile', {
                    setValueAs: (v) => (v && v.length > 0 ? v[0] : null),
                  })}
                />
              </div>
              {/*{errors.kycFile && <p className="text-sm text-red-500 animate-in slide-in-from-top-1">{errors?.kycFile?.message}</p>}*/}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className='mb-4 flex items-center justify-center py-4'>
              <img
                src='/logo.png'
                width={150}
                height={0}
                alt='pamtech logo'
                className=''
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Join us and get started in just a few steps</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-y-4 mb-8 px-4">
          <StepIndicator stepNumber={1} currentStep={step} title="Account" icon={UserCircle} />
          <StepIndicator stepNumber={2} currentStep={step} title="Personal" icon={User} />
          <StepIndicator stepNumber={3} currentStep={step} title="Company" icon={Building} />
          <StepIndicator stepNumber={4} currentStep={step} title="Settings" icon={Languages} />
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
              {renderStep()}

              {errors.root?.serverError && (
                <p className="text-sm text-red-500 mt-4 animate-in slide-in-from-top-1">
                  {errors.root.serverError.message}
                </p>
              )}

              <div className="flex justify-between items-center pt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 font-medium"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ${step === 1 ? 'w-full justify-center' : 'ml-auto'}`}
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 ml-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    {!isSubmitting && <Check className="h-4 w-4 ml-2" />}
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Sign in here
              </Link>
            </p>
            <p className="text-center text-xs text-gray-400 mt-4">
              By creating an account, you agree to our{' '}
              <a href="#" className="hover:text-gray-600 transition-colors">Terms of Service</a> and{' '}
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};