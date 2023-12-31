import { useEffect, useReducer } from "react";
import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsTimer: 15,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        index: 0,
        points: 0,
        secondsTimer: 15,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        secondsTimer: 15,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        answer: null,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "showAnswer":
      const show = state.questions.at(state.index);
      return {
        ...state,
        secondsTimer:
          state.secondsTimer === 0
            ? 0
            : state.secondsTimer - 1 && state.answer != null
            ? 0
            : state.secondsTimer - 1,
        answer: state.secondsTimer === 0 ? show.correctOption : state.answer,
      };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsTimer },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  return (
    <>
      <div className="app">
        <Header />

        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen
              numberOfQuestions={questions.length}
              dispatch={dispatch}
            />
          )}
          {status === "active" && (
            <>
              <Progress
                numberOfQuestions={questions.length}
                index={index}
                points={points}
                totalPoints={totalPoints}
              />
              <Questions
                questions={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
            </>
          )}
          <Footer>
            {secondsTimer === 0 && (
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                numberOfQuestions={questions.length}
                index={index}
              />
            )}

            {status === "active" && (
              <Timer dispatch={dispatch} secondsTimer={secondsTimer} />
            )}
          </Footer>

          {status === "finished" && (
            <FinishScreen
              points={points}
              totalPoints={totalPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
