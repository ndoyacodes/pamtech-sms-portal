import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  User, Lock, XCircle 
} from 'lucide-react';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Button } from '@/components/custom/button';
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form'

const profileSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    username: z.string().email('Invalid username format')
  })

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
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      username: user?.username || ''
    }
  })

  const handleProfileUpdate = async (data: any) => {
    try {
      // API call to update profile
      console.log('Profile updated:', data)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, 
    formState: { errors: passwordErrors }, reset: resetPassword } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  });


  const handlePasswordChange = async (data: PasswordFormData) => {
      console.log(data);
      resetPassword();
      setServerError('Password changed failed');
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
      <div className=' p-4 space-y-8'>
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
                 onClick={form.handleSubmit(handleProfileUpdate)}
                  
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-6">
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
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