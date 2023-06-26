import Route from '@/constants/routes';
import { toast } from 'react-toastify';

const redirectAfterShowingErrorToast = (errorMessage: string) => {
  toast.error(errorMessage);
  if (typeof window !== undefined) {
    window.location.replace(Route.HOME);
  }
};

export default redirectAfterShowingErrorToast;
