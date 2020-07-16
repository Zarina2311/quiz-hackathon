import React from "react";
import { quizData } from "./quizData";

class MainQuiz extends React.Component {
   state = {
    currentQuestion: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: false,
    isEnd: false,
  };

  loadQuizData = () => {
    this.setState(() => {
      return {
        questions: quizData[this.state.currentQuestion].question,
        answer: quizData[this.state.currentQuestion].answer,
        options: quizData[this.state.currentQuestion].options,
      };
    });
  };

  componentDidMount() {
    this.loadQuizData();
  }

  nextQuestionHandler = () => {
    const { myAnswer, answer, score } = this.state;
    console.log(myAnswer);
    if (myAnswer === null) {
      alert("Please choose an answer");
    } else {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1,
      });
      console.log(this.state.currentQuestion);
    }

    if (myAnswer === answer) {
      this.setState({
        score: score + 1,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer,
        };
      });
    }

  }

  checkAnswer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finishHandler = () => {
    if (this.state.currentQuestion === quizData.length - 1) {
      this.setState({
        isEnd: true,
      });
    }
    if (this.state.myAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1,
      });  
    }
  };
  
  render() {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <div className="result">
          <h3>Your final score is {this.state.score} points </h3>
          <p>Correct answers:</p>
          <div>
            {quizData.map((item, index) => (
              <div className="options" key={index}>
                {item.answer}
              </div>
            ))}
          </div>
          
        </div>
      );
    } else {
      return (
        <div className="App">
          <header>
            <h1 className="title">Quiz</h1>
            <h4 className="tagline">Test your JavaScript knowledge</h4>
          </header>
          <h1>{this.state.questions} </h1>
          <span>{`Questions ${currentQuestion}  out of ${
            quizData.length - 1
          } remaining `}</span>
          {options.map((option) => (
            <p
              key={option.id}
              className={`options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.checkAnswer(option)}
            >
              {option}
            </p>
          ))}
          {currentQuestion < quizData.length - 1 && (
            <button
              className="button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionHandler}
            >
              Next
            </button>
          )}
          {currentQuestion === quizData.length - 1 && (
            <button className="button" onClick={this.finishHandler}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}

export default MainQuiz;
