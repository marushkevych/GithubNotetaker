var React = require('react-native');
var Profile = require('./Profile');
var Repositories = require('./Repositories');
var Notes = require('./Notes');
var api = require('../Utils/api');

var {
  StyleSheet,
} = React;

var View = React.createFactory(React.View);
var Text = React.createFactory(React.Text);
var Image = React.createFactory(React.Image);
var TouchableHighlight = React.createFactory(React.TouchableHighlight);


class Dashboard extends React.Component{


	goToProfile(){
		this.props.navigator.push({
			title: 'Profile',
			component: Profile,
			passProps: {userInfo: this.props.userInfo}
		});	
	}

	goToRepos(){
		this.props.navigator.push({
			title: 'Repositories',
			component: Repositories,
			passProps: {userInfo: this.props.userInfo}
		});	
	}

	goToNotes(){
		this.props.navigator.push({
			title: 'Notes',
			component: Notes,
			passProps: {userInfo: this.props.userInfo}
		});	
	}

	render(){
		return View({style: styles.container},
			Image({
				source: {uri: this.props.userInfo.avatar_url},
				style: styles.image
			}),
			TouchableHighlight(
				{
					onPress: this.goToProfile.bind(this),
					underlayColor: '#88D485',
					style: styleButton('#48BBEC')
				},
				Text({style: styles.buttonText}, 'View Profile')
			),			
			TouchableHighlight(
				{
					onPress: this.goToRepos.bind(this),
					underlayColor: '#88D485',
					style: styleButton('#E77AAE')
				},
				Text({style: styles.buttonText}, 'View Repos')
			),			
			TouchableHighlight(
				{
					onPress: this.goToNotes.bind(this),
					underlayColor: '#88D485',
					style: styleButton('#758BF4')
				},
				Text({style: styles.buttonText}, 'View Notes')
			)
		);
	}	

};

function styleButton(backgroundColor){
	return {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'center',
		flex: 1,
		backgroundColor: backgroundColor
	};
}

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