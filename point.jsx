var React = require('react')
var linmap = require('linmap')
var createReactClass = require('create-react-class')

module.exports = createReactClass({
  getInitialState(){
      return {
          mouseOver: false
      }
  },
  mouseEnter(){
    this.props.onMouseEnterPoint(this.props.data);
    this.setState({mouseOver: true});
  },
  mouseLeave(){
    this.props.onMouseEnterPoint({});
    this.setState({mouseOver: false});
  },
  render () {
    var style={
        borderRadius: 35,
        cursor: "pointer",
        border: this.state.mouseOver?"1px solid white":undefined,
        width: 10,
        height: 10,
        backgroundColor: this.props.data.species == "setosa"?"#ff7f0e":
                         this.props.data.species == "versicolor"?"#2ca02c"
                                                                :"#1f77b4",
        position: "absolute",
        left: this.props.data.offset.left - 5,
        top: this.props.data.offset.top - 5,

        
    };


    return (<div onMouseEnter={this.mouseEnter} 
                 onMouseLeave={this.mouseLeave} style={style}>
      
      </div>)
  }
})
