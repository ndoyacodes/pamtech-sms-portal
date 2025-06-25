import { useState, FC } from 'react';
import { User, Mail, Eye, EyeOff, Wrench, Globe, ChevronDown, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/api-hooks/auth/useAuth';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; 

const formSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email('Invalid email format'),
  password: z.string().min(7, { message: 'Password must be at least 7 characters' }),
  confirmPassword: z.string(),
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  serviceType: z.string().min(1, { message: 'Please select a service type' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof formSchema>;

export const SignUpForm: FC = () => {
  const { registerCustomer } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      country: '',
      serviceType: '',
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = form;

  const countries = ['Tanzania', 'Kenya', 'Uganda', 'Rwanda', 'Burundi', 'Congo', 'South Sudan'];
  const serviceTypes = ['Postpaid', 'Prepaid'];

  const onFormSubmit = async (formData: FormData): Promise<void> => {
    try {
      const jsonPayload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        service_type: formData.serviceType,
      };
      await registerCustomer.mutateAsync(jsonPayload);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 py-8 md:px-6 lg:px-8 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, var(--brand-color-right), var(--brand-color-left)), url('/lady.png')`,
      }}
    >
      <div className="w-full max-w-2xl bg-white dark:bg-gray-900 transition-colors">
        <Card className="p-6 sm:p-8 md:p-10">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" width={120} alt="company logo" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white ">Create Your Account</h2>
            <p className="text-sm text-gray-600 dark:text-white">Join us and get started today</p>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">First Name</label>
                <div className="relative">
                  <input type="text" {...register('firstName')} className={`w-full rounded-md border px-4 py-2 pl-10 ${errors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-black" />
                </div>
                {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">Last Name</label>
                <div className="relative">
                  <input type="text" {...register('lastName')} className={`w-full rounded-md border px-4 py-2 pl-10 dark:text-white ${errors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-300'}`} />
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-black" />
                </div>
                {errors.lastName && <p className="text-sm text-red-500 mt-1 ">{errors.lastName.message}</p>}
              </div>
            </div>

          {/* Email and Phone Number */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-white">Email Address</label>
    <div className="relative">
      <input
        type="email"
        {...register('email')}
        className={`w-full rounded-md border px-4 py-2 pl-10 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
      />
      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-black" />
    </div>
    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-white">Phone Number</label>
    <PhoneInput
      country={'tz'}
      countryCodeEditable={false}
      inputProps={{ name: 'phoneNumber', required: true }}
      value={form.getValues('phoneNumber')}
      onChange={(value, data: any) => {
        const dialCode = data?.dialCode || '';
        const numericValue = value.replace(/\D/g, '');
        const localNumber = numericValue.startsWith(dialCode)
          ? numericValue.slice(dialCode.length)
          : numericValue;
        const fullNumber = `${dialCode}${localNumber.slice(0, 9)}`;
        form.setValue('phoneNumber', fullNumber);
      }}
      inputClass={`!w-full !pl-16 !pr-4 !py-5 !rounded-md dark:text-black!text-sm ${errors.phoneNumber ? '!border-red-400 !bg-red-50' : '!border-gray-300'}`}
      buttonClass="!border-none !bg-transparent !left-3"
      containerClass="!w-full"
    />
    {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber.message}</p>}
  </div>
</div>

{/* Service Type and Country */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-white">Service Type</label>
    <div className="flex items-center gap-4 mt-2">
      <Wrench className="h-4 w-4 text-gray-500 dark:text-white" />
      {serviceTypes.map((type) => (
        <label key={type} className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            value={type}
            {...register('serviceType')}
            className="accent-blue-600"
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
    {errors.serviceType && <p className="text-sm text-red-500 mt-1">{errors.serviceType.message}</p>}
  </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Country</label>
        <div className="relative">
          <select
            {...register('country')}
            className={`w-full rounded-md border px-4 py-2 pl-10 dark:text-black appearance-none ${errors.country ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-black" />
          <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>}
      </div>
    </div>

    {/* Password and Confirm Password */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            className={`w-full rounded-md dark:text-black border px-4 py-2 pl-10 pr-10 ${errors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-black" />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="w-5 h-5 dark:text-black" /> : <Eye className="w-5 h-5 dark:text-black" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword')}
            className={`w-full rounded-md border px-4 py-2 pl-10 dark:text-black pr-10 ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          />
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-black" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5 dark:text-black" /> : <Eye className="w-5 h-5 dark:text-black" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
      </div>
    </div>


            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg text-white font-medium transition-transform transform hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(to right, var(--brand-color-TOP), var(--brand-color-BOTTOM))' }}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-sm text-gray-600 dark:text-white">
              Already have an account?{' '}
              <Link to="/sign-in" className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400">Sign in</Link>
            </p>

            <p className="text-center text-xs text-gray-500 dark:text-white">
              By clicking Create Account, you agree to our{' '}
              <Link to="https://pamtech.co.tz/terms-of-service/" className="underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Terms of Service
              </Link>{' '}and{' '}
              <Link to="https://pamtech.co.tz/terms-of-service/" className="underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                Privacy Policy
              </Link>.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};