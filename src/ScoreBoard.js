/**
 * Created by suzanne on 5/6/18.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './ScoreBoard.css'

class ScoreBoard extends Component {

  render(){
    return(
      <scoreboard>
        <h2><a>Score</a></h2>
        <nav>
          <li>Number of Turns: {this.props.numTurns}</li>
          <li>Matched Pairs: {this.props.matchedPairs}</li>
        </nav>
      </scoreboard>

    )
  }
}

ScoreBoard.propTypes = {
  numTurns: PropTypes.number.isRequired,
  matchedPairs: PropTypes.number.isRequired
}

export default ScoreBoard