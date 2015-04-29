var React = require('react-native');
var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');
var api = require('../Utils/api');
var WebView = require('./Helpers/WebView');

var {
	View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableHighlight,
    ActivityIndicatorIOS
} = React;


class Repositories extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      repos: [],
      isLoading: true,
      error: false
    }

    api.getRepos(this.props.userInfo.login).then((res) => {
      this.setState({isLoading: false, repos: res});
    }, (err) => {
      this.setState({isLoading: false, error: "Failes to get repos"});
    });    
  }   

  openPage(url){
    this.props.navigator.push({
      title: 'Web View',
      component: WebView,
      passProps: {url}
    });     
  }

	render(){
		var userInfo = this.props.userInfo;
    var repos = this.state.repos;
    console.log('repos', this.state.repos);

    var list = repos.map((repo, index) => {
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this.openPage.bind(this, repo.html_url)}
              underlayColor='transparent'>
              <View>
                <Text style={styles.name}>{repo.name}</Text>
                <Text style={styles.stars}>Stars: {repo.stargazers_count}</Text>
                <Text style={styles.description}>{repo.description}</Text>
              </View>
            </TouchableHighlight>
          </View>
          <Separator/>
        </View>
        
      );
    });

		return (
			<ScrollView style={styles.container} >
				<Badge userInfo={userInfo}/>
        {list}
        <ActivityIndicatorIOS 
          animating={this.state.isLoading}
          color='#111'
          size='large'
        />       
        <Text>{this.state.error ? this.state.error : ""}</Text>
			</ScrollView>
		);
	}

}

module.exports = Repositories;


var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});