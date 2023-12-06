function Progress({ numberOfQuestions, index, points, totalPoints }) {
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index}
        className="progress-bar"
      />
      <p>
        Question <strong>{index + 1}</strong>/{numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
