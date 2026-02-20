import toast from 'react-hot-toast';

const toastConfig = {
  success: {
    duration: 3000,
    style: {
      background: '#10B981',
      color: '#fff',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#10B981',
    },
  },
  error: {
    duration: 4000,
    style: {
      background: '#EF4444',
      color: '#fff',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#EF4444',
    },
  },
  loading: {
    style: {
      background: '#3B82F6',
      color: '#fff',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: '500',
    },
  },
};

export const showToast = {
  success: (message) => toast.success(message, toastConfig.success),
  error: (message) => toast.error(message, toastConfig.error),
  loading: (message) => toast.loading(message, toastConfig.loading),
  promise: (promise, messages) => toast.promise(promise, messages, {
    success: toastConfig.success,
    error: toastConfig.error,
    loading: toastConfig.loading,
  }),
};

export default showToast;
