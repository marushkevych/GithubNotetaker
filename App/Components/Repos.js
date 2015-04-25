var React = require('react-native');

var {
  StyleSheet,
} = React;

var ScrollView = React.createFactory(React.ScrollView);
var Text = React.createFactory(React.Text);
var Badge = React.createFactory(require('./Badge'));

class Repos extends React.Component{

	render(){
		return ScrollView({style: styles.container},
			Badge({userInfo: this.props.userInfo}),
			Text({style: styles.rowTitle}, 'Repos')
		);
	}
}


module.exports = Repos;


var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});