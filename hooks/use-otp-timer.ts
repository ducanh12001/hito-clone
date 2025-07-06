import { useState, useEffect, useCallback } from 'react';

interface UseOtpTimerOptions {
  initialTime?: number;
  onExpired?: () => void;
}

export const useOtpTimer = (options: UseOtpTimerOptions = {}) => {
  const { initialTime = 60, onExpired } = options;

  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setCanResend(true);
            onExpired?.();

            return 0;
          }

          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft, onExpired]);

  const startTimer = useCallback(
    (time?: number) => {
      const startTime = time ?? initialTime;
      setTimeLeft(startTime);
      setIsRunning(true);
      setCanResend(false);
    },
    [initialTime],
  );

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    setCanResend(false);
  }, [initialTime]);

  return {
    timeLeft,
    isRunning,
    canResend,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
