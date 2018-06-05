import React, { Component } from 'react';
import './App.css';
import Box from './Box.js'
import NavBar from './NavBar'
import shuffle from 'shuffle-array'
import ScoreBoard from './ScoreBoard'

const NUM_BOXES = 16

const cardState= {
  HIDING: 0,
  SHOWING: 1,
  MATCHED: 2
}

class App extends Component {
  constructor(props) {
    super(props)
    let  boxes = Array(NUM_BOXES).fill().map((b, i) => {
      return ({
        id: i,
        backgroundColor: this.props.allColors[i],
        showState: cardState.HIDING,
      })
    })

    boxes = shuffle(boxes)
    console.log(boxes)

    this.state = {
      boxes,
      noClick: false,
      numTurns: 0,
      matchedPairs: 0,
      gameWon: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleNewGame = this.handleNewGame.bind(this)
  }

  handleNewGame() {
    let boxes = this.state.boxes.map(b => ({
      ...b,
      showState: cardState.HIDING
    }))
    boxes = shuffle(boxes)

    this.setState(
      {
        boxes,
        numTurns:      0,
        matchedPairs:  0,
        gameWon:       false
      }
    )
  }
  incrementMatch () {
    this.setState(prevState => {
      return {matchedPairs: prevState.matchedPairs + 1}
    })
  }

  incrementTurn () {
    this.setState(prevState => {
      return {numTurns: prevState.numTurns + 1}
    })
  }

  handleClick(id) {
    console.log("Clicked me: " + id)
    const mapBoxState = (boxes, idsToChange, newBoxState) => {
      return boxes.map(b => {
        if (idsToChange.includes(b.id)) {
          return {
            ...b,
            showState: newBoxState
          }
        }
        return b
      })
    }

    const foundBox = this.state.boxes.find(b => b.id === id)
    console.log(foundBox, this.state.noClick)

    if (this.state.noClick || foundBox.showState !== cardState.HIDING) {
      return
    }

    console.log("Box is hiding!")
    let noClick = false

    let boxes = mapBoxState(this.state.boxes, [id], cardState.SHOWING)
    //console.log(boxes)

    const showingBoxes = boxes.filter((b) => b.showState===cardState.SHOWING)
    console.log("These are now showing: ", showingBoxes)

    const ids = showingBoxes.map(b => b.id)
    console.log(ids)
    if (showingBoxes.length ===2 &&
        showingBoxes[0].backgroundColor === showingBoxes[1].backgroundColor) {
      console.log("These boxes match!")
      console.log(showingBoxes)

      boxes = mapBoxState(boxes, ids, cardState.MATCHED)
      console.log("After Matching Update: " + boxes)
      this.incrementMatch()
      this.incrementTurn()

    } else  if (showingBoxes.length ===2 ) {
      this.incrementTurn()
      console.log("these boxes don't match")
      let hidingBoxes = mapBoxState(boxes, ids, cardState.HIDING)
      noClick = true
      this.setState({boxes, noClick}, () => {
        setTimeout(()=>{
          this.setState({boxes: hidingBoxes, noClick: false})
        }, 800)
      })
      return
    }

    this.setState({boxes, noClick})
   }


  render() {

  const boxes = this.state.boxes.map((box,i)=> {
      return (
        <Box
          showing={box.showState}
          backgroundColor={box.backgroundColor}
          key={box.id}
          onClick = {()=> this.handleClick(box.id)}
        />
      )
  })


    return (
      <div>
        <NavBar onNewGame={this.handleNewGame} />
        <ScoreBoard
          numTurns={this.state.numTurns}
          matchedPairs={this.state.matchedPairs}
        />
        <div className="container">
        {boxes}
        </div>

      </div>
    )
  }
}

App.defaultProps = {
  allColors: [
    "Aqua",
    "BlanchedAlmond",
    "DarkSalmon",
    "OrangeRed",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MintCream",
    "Aqua",
    "BlanchedAlmond",
    "DarkSalmon",
    "OrangeRed",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MintCream"
  ]


};


export default App;
