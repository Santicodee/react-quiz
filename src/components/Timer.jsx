import { useEffect } from "react";
function Timer({ secondsTimer, dispatch }) {
  // Initial countdown time in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "showAnswer" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  const minutes = Math.floor(secondsTimer / 60);
  const seconds = secondsTimer % 60;

  return (
    <div className="timer">
      <span>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default Timer;
