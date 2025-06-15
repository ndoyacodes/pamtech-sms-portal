import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/store-hooks';
import { toast } from 'react-toastify';
import { authService } from '@/api/services/auth/auth.service';
import { setCredentials } from '@/store/slices/auth/auth.slice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

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
    onSuccess: (res: any) => {
      toast.success('Your account has been created successfully. OTP was sent to your phone number.');

      console.log(res)

      const phone = res.body.phoneNumber

      // Set phone in cookie (expires in 3 mins)
      Cookies.set('signup_phone', phone, { expires: 3 / 1440 }) // 3 minutes

      navigate('/verify-phone');
    },
    onError: (error: any) => {
      console.log('error', error);

      const errorMessage =
        error?.response?.data?.message || 'Failed to register user';
        toast.error(errorMessage);
    }
  });

  const verifyPhone = useMutation({
    mutationFn: authService.verifyPhone.bind(authService),
    onSuccess: () => {
      toast.success('Phone number was successfully verified. Please login.');

      navigate('/sign-in');
    },
    onError: (error: any) => {
      console.log('error', error);
      const errorMessage = error.response?.data?.message || 'Failed to verify phone number';
      toast.error(errorMessage);
    }
  });

  const  forgetPassword = useMutation(
    {
        mutationFn: authService.forgetPassword.bind(authService),
        onSuccess: () => {
            toast.success("password reset was sent successfully, a link is sent to your email to reset your password");
        },
        onError: () => {
            toast.error("Failed to reset password, email account not found")
        }
    }
)

const resetPassword = useMutation(
  {
      mutationFn: authService.forgetReset.bind(authService),
      onSuccess: () => {
          toast.success("password reset sent successfully");
      },
      onError: () => {
          toast.error("Failed to reset passwors")
      }
  }
)

  const reset = useMutation({
    mutationFn: ({ token, email, data }: { token: string; email: string, data: any }) =>
      authService.resetPassword(token, email, data),
    onSuccess: () => {
      navigate('/sign-in');
      toast.success('Password updated successfully');
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || 'Password reset failed';
      toast.error(errorMessage);
    }
  });


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
    forgetPassword,
    verifyPhone,
    resetPassword,
    reset
  };
};
