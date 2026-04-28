import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Returns a back-handler that pops history when possible,
 * otherwise navigates to a safe fallback route.
 */
export const useSafeBack = (fallback: string = "/") => {
  const navigate = useNavigate();
  return useCallback(() => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  }, [navigate, fallback]);
};
