var React = require('react-native');
var api = require('../Utils/api');
var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');

var {
    View,
    Text,
    ListView,
    StyleSheet,
    TouchableHighlight,
    TextInput
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});


class Notes extends React.Component{
	constructor(props){
		super(props);
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			 dataSource: ds.cloneWithRows(this.props.notes),
			 note: '',
			 error: ''
		}

	}
	handleChange(e){
		this.setState({
			note: e.nativeEvent.text
		})
	}
	handleSubmit(e){
		var user = this.props.userInfo.login;
		var note = this.state.note;
		this.setState({
			note: ''
		});

		api.addNote(user, note).then((res) => {
			api.getNotes(user).then((notes) =>{
				console.log('notes', notes)
				this.setState({
					dataSource: ds.cloneWithRows(notes)
				});
			});
		}).catch((error) => {
			console.log('Request failed', error);
			this.setState({error})
		});
	}
	renderRow(rowData){
		console.log('rowData', rowData)
		return (
			<View>
				<View style={styles.rowContainer}>
					<Text>{rowData}</Text>
				</View>
				<Separator/>
			</View>
		)
	}
  footer(){
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placehplder="New Note" />
        <TouchableHighlight 
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }
  render(){
      return (
      	<View style={styles.container}>
      		<ListView
      			dataSource={this.state.dataSource}
      			renderRow={this.renderRow}
      			renderHeader={() => <Badge userInfo={this.props.userInfo} />} />
          	
        	{this.footer()}
        </View>
      );
  }
}


Notes.propTypes = {
	userInfo: React.PropTypes.object.isRequired,
	notes: React.PropTypes.object.isRequired
}

module.exports = Notes;


