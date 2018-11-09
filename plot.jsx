var React = require('react')
var linmap = require('linmap')
var createReactClass = require('create-react-class')

var Point = require('./point.jsx')

module.exports = createReactClass({
  getInitialState () {
    return {
      data: []
    }
  },
  injectOffsetsIntoData (data) {
    var minPetalWidth = data.reduce((min, p) =>
                        p.petalWidth < min ? p.petalWidth : min, data[0].petalWidth)
    var maxPetalWidth = data.reduce((max, p) =>
                        p.petalWidth > max ? p.petalWidth : max, data[0].petalWidth)
    var maxPetalLength = data.reduce((max, p) =>
                        p.petalLength > max ? p.petalLength : max, data[0].petalLength)
    var minPetalLength = data.reduce((min, p) =>
                        p.petalLength < min ? p.petalLength : min, data[0].petalLength)
    data.forEach((d, idx) => {
      d.i = idx
      d.offset = {
        left: linmap(minPetalWidth, maxPetalWidth, 0, this.props.width, d.petalWidth),
        top: this.props.height - linmap(
            minPetalLength, maxPetalLength, 0, this.props.height, d.petalLength
            )
      }
    })
    this.setState({data: data})
  },
  componentWillReceiveProps (newProps) {
    // We don't need to inject offsets if our data is empty array
    if (newProps.data.length > 0) {
      this.injectOffsetsIntoData(Object.assign({}, newProps).data)
    }
  },
  render () {
    var style = {
      position: 'relative',
      color: 'rgba(255, 255, 255, 0.8)'
    }
    return (
      <div style={style}>
        {this.state.data.map((d) => (<Point
          onMouseEnterPoint={this.props.onMouseEnterPoint}
          data={d} key={d.i} />))}
      </div>)
  }
})
