import React from "react";
import AnswerModal from "./AnswerModal";
import { MathHelper } from "../utils";
import './Quiz.css'
import sessionData from "../utils/sessionData.js"

import zero from "../assets/zero.png"
import one from "../assets/one.png"
import two from "../assets/two.png"
import three from "../assets/three.png"
import four from "../assets/four.png"
import five from "../assets/five.png"
import six from "../assets/six.png"
import seven from "../assets/seven.png"
import eight from "../assets/eight.png"
import nine from "../assets/nine.png"
// import NumberLineMove from './NumberLineMove.jsx'



import "animate.css"
import Alphabets from "./Alphabets";
class Quiz extends React.Component {
  _isMounted = false;
  _secondsIntervalRef;
  state = {
    // problem: "",
    // firstNumber: 0,
    // secondNumber: 0,
    // symbol: "",
    // answer: 0,
    number: 0,
    modal: "",
    modalShowing: false,
    streaks: 0,
    randomImage: null,
    data: [],
    possibleAnswers: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
    answer: "",
    images: [zero, one, two, three, four, five, six, seven, eight, nine],
    totalProblems: 1
  };

  earnLife = () => {
    this.props.onEarnLife();
    this.showModal("success", "STREAK!! You won a life ♥");
    this.setState({
      streaks: 0
    });
  };

  correctAnswer = () => {
    if (this.state.streaks > 2) {
      this.earnLife();
    } else {
      this.showModal("success");
    }

    this._isMounted && this.props.onCorretAnswer();
    this.setState(state => {
      return {
        streaks: state.streaks + 1
      };
    });

    this.nextProblem();
  };

  componentDidMount() {
    this._isMounted = true;
    this.getProblem();
   
    // this.populateHover();

    // this.answerInput.focus();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.lifes < 1) {
      this.props.onEndGame(this.state.points);
      return false;
    }
    return nextProps.lifes > -1;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidUpdate() {
    if (this.state.totalProblems > sessionData.limit) {
      this.props.onEndGame(this.state.points)
    }
  }

  wrongAnswer = () => {
    this._isMounted && this.props.onWrongAnswer();
    this.setState({
      streaks: 0
    });
    this.showModal("error", this.state.possibleAnswers[this.state.number]);
    this.nextProblem();
  };

  nextProblem = () => {
    setTimeout(() => {
      this.getProblem();
      this._isMounted &&
        this.setState({
          modalShowing: false,
          answer: "",
          totalProblems: this.state.totalProblems + 1
        });
      if (this.props.lifes > 0) (this.answerInput && this.answerInput.focus());
    }, 2500);
  };

  evaluateProblem = () => {
    // const answer = MathHelper.solve(this.state.problem);

    // const problem = this.state.firstNumber + "!" + this.state.secondNumber
    // sessionData.setData(problem, attemptedAnswer, answer)
    // sessionData.sendData()
    if (this.state.possibleAnswers[this.state.number] === this.state.answer.toString().toLowerCase()) {
      return this.correctAnswer();
    }
    return this.wrongAnswer();
  };

  keyingUp = ev => {
    if (ev.key === "Enter") {
      this.evaluateProblem();
    }
    // const val = ev.target.value;

    // this.setState({
    //   answer: Number(val.match(/((-?)\d+)/g)) // accept just numbers and the minus symbol
    // });

  };

  showModal = (type, text) => {
    this.setState({
      modal: <AnswerModal type={type} text={text} />,
      modalShowing: true
    });
  };

  getProblem = () => {
    // const newProblemSet = MathHelper.generateAdditionProblem(this.props.points);
    // const newProblemSet = MathHelper.generateAdditionProblem(this.props.points);
    const newNumber = MathHelper.generateOrdinalNumberWithinTen();
    this.getImage(newNumber);
    this._isMounted &&
      this.setState({
        // problem: newProblemSet.problem,
        // firstNumber: newProblemSet.firstNumber,
        // secondNumber: newProblemSet.secondNumber,
        // symbol: newProblemSet.symbol,
        number: newNumber
      });
  };

  handleInputChange = (e) => {
    this.setState({
      answer: [e.target.value]
    })
  }
  getImage = (number) => {
    this.setState({ randomImage: this.state.images[number] })
  }



  render() {
    // const images = [...Array(parseInt(this.state.firstNumber))].map((e, i) => {
    //   return <img key={i} src={bowl} style={{ width: "100px", height: "80px" }} />
    // });

    return (
      <section className="show-up" style={{ width: "100%", height: "100vh" }}>
        {/* <Hints currentProblem={this.state.problem}/> */}
        <div >
          {this.state.modalShowing ? (
            this.state.modal
          ) : (
            <div style={{ marginTop: "10vh" }}>

              <div >
                {/* <div className="objectLeft">
                  {[...Array(parseInt(this.state.number))].map((e, i) => {
                    return <img key={i} src={this.state.randomImage} className="questionImage " draggable="false" />
                  })}
                </div> */}
                <img src={this.state.randomImage} className="questionImage " draggable="false" />
                {/* <table align="center">
                    <tbody>
                      <tr >
                        {[...Array(parseInt(this.state.firstNumber))].map((e, i) => {
                          return <td ><img key={i} src={this.state.randomImage} className="questionImage " draggable="false" /> </td>
                        })}
                        <td className="center"><h1 style={{ fontSize: "3.5em" }}> {this.state.symbol} </h1></td>
                        {[...Array(parseInt(this.state.secondNumber))].map((e, i) => {
                          return <td ><img key={i} src={this.state.randomImage} className="questionImage " draggable="false" /></td>
                        })}
                      </tr>
                    </tbody>
                  </table> */}
                {/* <div className="objectRow" style={{ width: "100%" }}>
                    <div className="objectLeft">
                      {[...Array(parseInt(this.state.firstNumber))].map((e, i) => {
                        return <img key={i} src={this.state.randomImage} className="questionImage " draggable="false" />
                      })}
                    </div>
                    <span className="operator" style={{ fontSize: "3.5em", textShadow: "1px 1px 1px #ff0000", float: "left", display: "inline" }}> {this.state.symbol} </span>
                    <div className="objectRight">
                      {[...Array(parseInt(this.state.secondNumber))].map((e, i) => {
                        return <img key={i} src={this.state.randomImage} className="questionImage " draggable="false" />
                      })}
                    </div>
                  </div> */}
                {/* <h1 style={{ fontSize: "3.5em" }}> {this.state.number} </h1> */}
                {/* <NumberLineMove incCount={(number) => { this.setState({ answer: this.state.answer + number }) }} decCount={(number) => { this.setState({ answer: this.state.answer - number }) }} count={this.state.answer} /> */}
                {/* <Drop incCount={(number) => { this.setState({ answer: this.state.answer + number }) }} decCount={(number) => { this.setState({ answer: this.state.answer - number }) }} count={this.state.answer} img={this.state.randomImage} /> */}

              </div>
              <Alphabets setAnswer={(answer) => {this.setState({answer : answer})}} onClick={this.evaluateProblem} />

              {/* <input
                className="App-input"
                type="text"
                placeholder="Enter"
                onChange={e => this.handleInputChange(e)}
                onKeyUp={this.keyingUp}

              /> */}
              {/* <input
                ref={input => {
                  this.answerInput = input;
                }}
                className=""
                type="number"
                placeholder="Enter"
                value={this.state.answer}
                onKeyUp={this.keyingUp}
              /> */}
              {/* <button className="btn fourth answerButton" onClick={this.evaluateProblem}> check </button> */}
            </div>
          )}
        </div>
      </section>

    );
  }
}

export default Quiz;
