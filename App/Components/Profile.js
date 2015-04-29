var React = require('react-native');
var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');

var {
	View,
    StyleSheet,
    ScrollView,
    Text,
} = React;


class Profile extends React.Component{

    render(){
    	var titles = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];
    	var userInfo = this.props.userInfo;

    	var list = titles.filter((title)=>userInfo[title]).map((title, index) => {
    		return(
				<View key={index}>
					<View style={styles.rowContainer}>
						<Text style={styles.rowTitle}> {formatTitle(title)} </Text>
						<Text style={styles.rowContent}> {userInfo[title]} </Text>
					</View>
					<Separator/>
				</View>	          	
    		);
    	})
    	return (
	        <ScrollView style={styles.container}>
	          	<Badge userInfo={userInfo}/>
	          	{list}
          	</ScrollView>
        );
    }
}

module.exports = Profile;

function formatTitle(title){
	title = title.replace('_', ' ');
	return title[0].toUpperCase() + title.slice(1);
}


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