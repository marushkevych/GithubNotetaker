var api = {
	getBio: function(username){
		username = username.toLowerCase().trim();
		return doFetch(`https://api.github.com/users/${username}`);
	},
	getRepos: function(username){
		username = username.toLowerCase().trim();
		return doFetch(`https://api.github.com/users/${username}/repos`);
	},
	getNotes: function(username){
		username = username.toLowerCase().trim();
		return doFetch(`https://github-notes-saver.firebaseio.com//${username}.json`);
	},
	addNote: function(username, note){
		username = username.toLowerCase().trim();
		return doFetch(`https://github-notes-saver.firebaseio.com//${username}.json`, {
			method: 'post',
			body: JSON.stringify(note)
		});
	}

};

function doFetch(url, conf){
	return fetch(url, conf).then((res) => {
		return res.json().then((json) => {
			if(json.message === 'Not Found'){
				throw new Error("Not Found");
			}
			return json;	
		})		
	});
}


module.exports = api;