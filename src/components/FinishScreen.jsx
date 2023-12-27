function FinishScreen({ points, totalPoints, highscore, dispatch }) {
  const pointsPercentage = (points / totalPoints) * 100;

  let emoji;
  if (pointsPercentage === 100) emoji = "💯";
  if (pointsPercentage < 100 && pointsPercentage >= 60) emoji = "💚";
  if (pointsPercentage < 60) emoji = "💓";
  return (
    <>
      <p className="result">
        {emoji} Your points is {points} out of {totalPoints}. (
        <b>{pointsPercentage.toFixed(2)}%</b>)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <p className="note">
        Note: <br />
        💯 = Perfect <br /> 💚=Passed <br /> 💓=Failed
      </p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
