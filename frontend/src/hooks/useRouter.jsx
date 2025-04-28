// src/hooks/useRouter.js
import { useNavigate } from 'react-router-dom';

export const useRouter = () => {
  const navigate = useNavigate();
  return {
    push: (path) => navigate(path),
    // Add other router methods as needed
  };
};