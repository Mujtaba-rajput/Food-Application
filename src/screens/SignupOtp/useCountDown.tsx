import { useEffect, useState } from "react";

const useCountdown = (seconds: number) => {
  const [countDown, setCountDown] = useState<number>(seconds);

  useEffect(() => {
    if (countDown > 0) {
      const interval = setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countDown]);

  return { countDown, setCountDown };
};

export default useCountdown;
