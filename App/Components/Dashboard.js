var React = require('react-native');

var {
  StyleSheet,
} = React;

var View = React.createFactory(React.View);
var Text = React.createFactory(React.Text);
var Image = React.createFactory(React.Image);
var TouchableHighlight = React.createFactory(React.TouchableHighlight);


class Dashboard extends React.Component{

  render(){
    return View({style: styles.container},
      Text(null, 'This is Dashboard'),
      Text(null, this.props.userInfo)
    );
  }	

};

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

module.exports = Dashboard;