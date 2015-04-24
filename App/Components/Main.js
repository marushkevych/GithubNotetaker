var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./Dashboard');

var {
  StyleSheet,
} = React;

var View = React.createFactory(React.View);
var Text = React.createFactory(React.Text);
var TextInput = React.createFactory(React.TextInput);
var TouchableHighlight = React.createFactory(React.TouchableHighlight);
var ActivityIndicatorIOS = React.createFactory(React.ActivityIndicatorIOS);


class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
    
  }
  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    })
  }
  handleSubmit(){
    this.setState({isLoading: true});
    console.log('SUBMIT', this.state.username);

    // fetch data from Github
    api.getBio(this.state.username).then((res) => {
      console.log('response', res);
      this.props.navigator.push({
        title: res.name || 'Select an option',
        component: Dashboard,
        passProps: {userInfo: res}
      });
      // reset state
      this.setState({
        username: '',
        isLoading: false,
        error: false        
      })
    }, (err) => {
      this.setState({
        error: 'User not found',
        isLoading: false
      })
    });

    // reroute to the next passing that github information
  }
  render(){
    return View({style: styles.mainContainer},
      Text({style: styles.title}, 'Serach for GitHub user'),
      TextInput({
        style: styles.searchInput,
        value: this.state.username,
        onChange: this.handleChange.bind(this)
      }),
      TouchableHighlight({
          style: styles.button,
          underlayColor: 'white',
          onPress: this.handleSubmit.bind(this)
        },
        Text({style: styles.buttonText}, 'SEARCH')
      ),
      ActivityIndicatorIOS({
        animating: this.state.isLoading,
        color: '#111',
        size: 'large'
      }),
      Text(null, this.state.error ? this.state.error : "")
    );
  }

}

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = Main;
