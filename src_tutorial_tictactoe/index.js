import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = props => {
	return (
		<button
			className="square"
			onClick={props.onClick}
		>
		{props.value}
		</button>
	);
};

class Board extends React.Component {

  renderSquare(i) {
    return (
			<Square
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
  }

  render() {
	  return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const { history, stepNumber, xIsNext } = this.state;
		const newHist = history.slice(0, stepNumber + 1);
		//const current = newHist[newHist.length-1];
		const current = newHist[stepNumber];
		const squares = current.squares.slice();
		if (squares[i]) return;
		if (calculateWinner(squares)) return;
		squares[i] = xIsNext ? 'X' : 'O';
		this.setState({
			history: newHist.concat([{squares}]),
			stepNumber: newHist.length,
			xIsNext: !xIsNext,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

  render() {
		const { history, stepNumber, xIsNext } = this.state;
		const player = xIsNext ? 'X' : 'O';
		const current = history[stepNumber];
		const winner = calculateWinner(current.squares);
		let status = `Next player: ${player}`;
		if (winner)
			status = `Winner: ${winner}`;

		const moves = history.map((step, move) => {
			const desc = move ? `Go to move #${move}` : 'Go to game start';
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			);
		});

    return (
      <div className="game">
        <div className="game-board">
          <Board
						squares={current.squares}
						onClick={(i) => this.handleClick(i)}
					/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


//============Helper=============
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

	let result = null;
  lines.some(([a, b, c]) => {
    if (!squares[a]) return false;
    if(squares[a] !== squares[b]) return false;
    if(squares[a] !== squares[c]) return false;
    result = squares[a];
    return true;
	});
	return result;

//  for (let i = 0; i < lines.length; i++) {
//    const [a, b, c] = lines[i];
//    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//      return squares[a];
//    }
//  }
//  return null;
}
