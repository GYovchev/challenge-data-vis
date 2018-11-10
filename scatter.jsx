var React = require('react')
var jsonist = require('jsonist')
var createReactClass = require('create-react-class')

var Plot = require('./plot.jsx')
var InfoBox = require('./infobox.jsx')

module.exports = createReactClass({
  getInitialState () {
    return {
      plotData: [],
      infoBoxData: {},
      windowToThisRatio: {
        width: window.innerWidth / this.props.width,
        height: window.innerHeight / this.props.height
      },
      thisSize: {
        width: this.props.width,
        height: this.props.height
      }
    }
  },
  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    jsonist.get(window.location + 'public/iris.json', {}, (err, data, resp) => {
      if (err) {
        window.alert('Couldnt load data:\n' + err)
        console.error(err)
      }
      this.setState({plotData: data, infoBoxData: {}})
    })
  },
  handleResize () {
    this.setState({thisSize: {
      width: window.innerWidth / this.state.windowToThisRatio.width,
      height: window.innerHeight / this.state.windowToThisRatio.height
    }})
  },
  onMouseEnterPoint (pointData) {
    this.setState({infoBoxData: pointData})
  },
  render () {
    var canvasStyle = {
      height: this.state.thisSize.height,
      width: this.state.thisSize.width,
      backgroundColor: '#222',
      boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.5)',
      border: '1px solid black',
      position: 'relative',
      color: 'rgba(255, 255, 255, 0.7)'
    }
    return (<div style={canvasStyle}>
      <Plot data={this.state.plotData} height={this.state.thisSize.height}
        width={this.state.thisSize.width} onMouseEnterPoint={this.onMouseEnterPoint} />
      <InfoBox data={this.state.infoBoxData} />
    </div>)
  }
})
