import React from "react"
import "./Track.css"

class Track extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  renderAction() {
    let buttonSign = ''
    this.props.isRemoval ? buttonSign = '-' : buttonSign = '+'
    return <button className="Track-action"
                   onClick={this.handleClick}>{buttonSign}</button>
  }

  handleClick() {
    if (!this.props.isRemoval) {
      this.props.onAdd(this.props.track)
    }
    else {
      this.props.onRemove(this.props.track)
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }
}

export default Track
