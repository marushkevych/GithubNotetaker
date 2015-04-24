'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
} = React;

var NavigatorIOS = React.createFactory(React.NavigatorIOS);
var Main = require('./App/Components/Main');

class GithubNotetaker extends React.Component{
  render() {

    return NavigatorIOS({
      style: styles.container,
      initialRoute: {
        title: 'Github Notetaker',
        component: Main
      }

    });


  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

AppRegistry.registerComponent('GithubNotetaker', () => GithubNotetaker);
