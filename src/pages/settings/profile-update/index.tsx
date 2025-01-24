import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  User, Mail, Phone, Lock, XCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Button } from '@/components/custom/button';
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

// Validation schemas
const profileSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Invalid phone number'),
  username: z.string().min(3, 'Username must be at least 3 characters')
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState('');
  const { user } = useAuthStore();

  const navigate = useNavigate()

  const { register: registerProfile, handleSubmit: handleProfileSubmit, 
    formState: { errors: profileErrors }, reset } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  });

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, 
    formState: { errors: passwordErrors }, reset: resetPassword } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  });

  const [userData, setUserData] = useState({
    user: {
      id: 0,
      username: '',
      email: '',
      marketing: {
        full_name: '',
        phone_number: '',
        created_at: '',
        updated_at: '',
        // ... other fields
      }
    }
  });



  const handleProfileUpdate = async (data: ProfileFormData) => {
    console.log(data);
  };

  const handlePasswordChange = async (data: PasswordFormData) => {
      console.log(data);
      
  };

    

  return (
     <Layout>
          {/* ===== Top Heading ===== */}
             <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
            <Search />
            <div className='ml-auto flex items-center space-x-4'>
              <ThemeSwitch />
              <UserNav />
            </div>
          </Layout.Header>
    
          <Layout.Body>
    <div className="">
        
      {/* Profile Section */}
      <div className='max-w-4xl mx-auto p-4 space-y-8'>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}
            
              >
                Edit Profile
              </Button>
            ) : (
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleProfileSubmit(handleProfileUpdate)}
                  
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <>
                    <Input
                      {...registerProfile('fullName')}
                      className="mt-1"
                    />
                    {profileErrors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {profileErrors.fullName.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-gray-900">
                    {userData.user.marketing.full_name}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                {isEditing ? (
                  <>
                    <Input
                      {...registerProfile('email')}
                      className="mt-1"
                    />
                    {profileErrors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {profileErrors.email.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-gray-900">
                    {userData.user.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <>
                    <Input
                      {...registerProfile('phoneNumber')}
                      className="mt-1"
                    />
                    {profileErrors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {profileErrors.phoneNumber.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-gray-900">
                    {userData.user.marketing.phone_number}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </label>
                {isEditing ? (
                  <>
                    <Input
                      {...registerProfile('username')}
                      className="mt-1"
                    />
                    {profileErrors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {profileErrors.username.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-gray-900">
                    {userData.user.username}
                  </p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Password Change Section */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-xl flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Change Password
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-6">
          <form 
            onSubmit={handlePasswordSubmit(handlePasswordChange)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Current Password
                </label>
                <Input
                  type="password"
                  {...registerPassword('currentPassword')}
                  className="mt-1"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  New Password
                </label>
                <Input
                  type="password"
                  {...registerPassword('newPassword')}
                  className="mt-1"
                />
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  {...registerPassword('confirmPassword')}
                  className="mt-1"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {passwordErrors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-end justify-end">
              <Button type="submit" className="w-full md:w-auto">
                Change Password
              </Button>
            </div>
          </form>
        </CardContent>
       
      </Card>
      </div>
      {serverError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          {serverError}
        </div>
      )}
    </div>
    </Layout.Body>
    </Layout>
  );
};

export default ProfilePage;