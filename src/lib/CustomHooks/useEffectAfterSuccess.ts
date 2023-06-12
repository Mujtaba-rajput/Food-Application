import { useEffect } from "react";

const useEffectAfterSuccess = (
  callback: () => void,
  dependency: boolean | undefined
) => {
  useEffect(() => {
    if (dependency) {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);
};

export default useEffectAfterSuccess;
