var React = require('react')
var createReactClass = require('create-react-class')

module.exports = createReactClass({
  render () {
    var tableStyle = {
      borderCollapse: 'separate',
      borderSpacing: '2px',
      borderColor: 'grey'
    }
    return (<div>
      {Object.keys(this.props.data).length > 0 && (
        <table style={tableStyle}>
          <tbody>
            <tr><td>i:</td><td>{this.props.data.i}</td></tr>
            <tr><td>species:</td><td>{this.props.data.species}</td></tr>
            <tr><td>petalWidth:</td><td>{this.props.data.petalWidth}</td></tr>
            <tr><td>petalLength</td><td>{this.props.data.petalLength}</td></tr>
            <tr><td>sepalWidth</td><td>{this.props.data.sepalWidth}</td></tr>
            <tr><td>sepalLength</td><td>{this.props.data.sepalLength}</td></tr>
          </tbody>
        </table>
        )}
    </div>)
  }
})
