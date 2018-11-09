var React = require('react')
var linmap = require('linmap')
var jsonist = require('jsonist')
var createReactClass = require('create-react-class')

var Plot = require('./plot.jsx');
var InfoBox = require('./infobox.jsx');

module.exports = createReactClass({
  getInitialState() {
    return {
      plotData: [],
      infoBoxData: {}
     };
  },
  componentDidMount () {
    jsonist.get(window.location+"public/iris.json", {}, (err, data, resp) => {
      if(err){
        alert("Couldnt load data:\n"+err);
      }
      this.setState({plotData: data, infoBoxData: {}});
    })
  },
  onMouseEnterPoint(pointData){
    this.setState({infoBoxData: pointData})
  },
  render () {
    var canvasStyle={
      height: this.props.height, 
      width: this.props.width,
      backgroundColor: "#222",
      boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.5)",
      border: "1px solid black",
      position: "relative",
      color: "rgba(255, 255, 255, 0.7)" 
    };
    return (<div style={canvasStyle}>
      <Plot data={this.state.plotData} height={this.props.height} 
            width={this.props.width} onMouseEnterPoint={this.onMouseEnterPoint}/>
      <InfoBox data={this.state.infoBoxData}/>
      </div>)
  }
})
