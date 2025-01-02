import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/store-hooks';
import { toast } from 'react-toastify';
import { authService } from '@/api/services/auth/auth.service';
import { setCredentials } from '@/store/slices/auth/auth.slice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Login mutation function
  const loginUser = useMutation({
    mutationFn: authService.login.bind(authService),
    onSuccess: (data: any) => {
      toast.success('User logged in successfully');

      if (data?.message == "Successfully logged in") {
        dispatch(
          setCredentials({
            accessToken: data?.accessToken,
            refreshToken: data?.refreshToken,
            user: data?.user
          })
        );

        navigate('/');
      } else {
        return true;
      }
    },
    onError: (error: any) => {
      console.log('error', error);
      const errorMessage =
        error?.response?.data?.message || 'Failed to login user';
      if (errorMessage.includes('Invalid credentials')) {
        toast.error('Invalid username or password');
      } else {
        toast.error(errorMessage);
      }
    }
  });

  const registerCustomer = useMutation({
    mutationFn: authService.regieter.bind(authService),
    onSuccess: (data: any) => {
      toast.success('Registration successful please login');
      // dispatch(
      //   setCredentials({
      //     access_token: data.access.access_token,
      //     refresh_token: data.access.refresh_token
      //   })
      // );

      // navigate('/dashboard/project-management');
    },
    onError: (error: any) => {
      console.log('error', error);

      const errorMessage =
        error?.response?.data?.message || 'Failed to register user';
      if (errorMessage.includes('Failed to register user')) {
        toast.error('Failed to register user');
      } else {
        toast.error(errorMessage);
      }
    }
  });


  const  forgetPassword = useMutation(
    {
        mutationFn: authService.forgetPassword.bind(authService),
        onSuccess: () => {
            toast.success("password  reset was sent successfully, enter the code sent to your phone number");
            navigate('/verify-otp');
        },
        onError: () => {
            toast.error("Failed to reset passwors, please try again later")
        }
    }
)

const updateCurrentUserProfile = useMutation(
  {
      mutationFn: ({ data }: { data: any }) => authService.updateCurrentUserProfile.bind(authService)(data),
      onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile"] }),
          toast.success("Profile was updated successfully")
      },
      onError: () => {
          toast.error("Failed to update profile, please try again later")
      }
  }
)


  return {
    loginUser,
    registerCustomer,
    updateCurrentUserProfile,
    forgetPassword
  };
};
