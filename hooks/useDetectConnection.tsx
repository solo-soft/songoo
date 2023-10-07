import { useEffect, useState } from "react";

const useDetectConnection = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    function onlineHandler() {
      setIsOnline(true);
    }
    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return {
    detectConnection: isOnline,
  };
};

export default useDetectConnection;
