/**
 * Created by suzanne on 5/4/18.
 */
import React  from 'react'
import PropTypes from 'prop-types'
import './FlexBox.css'

//stateless Component
const Box = (props) => {
    let style = {}
    if (props.showing!==0) {
      style.backgroundColor = props.backgroundColor
    }
    return (
      <div
        onClick = {props.onClick}
        className = 'card-container'
        style={style}>
    </div>
    )

}

Box.propTypes = {
  showing: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
export default Box