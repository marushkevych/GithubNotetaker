var api = {
	getBio: function(username){
		username = username.toLowerCase().trim();
		var url = `https://api.github.com/users/${username}`;
		return fetch(url).then(handleResponse);
	},
	getRepos: function(username){
		username = username.toLowerCase().trim();
		var url = `https://api.github.com/users/${username}/repos`;
		return fetch(url).then(handleResponse);
	}

};

function handleResponse(res){
	return res.json().then((json) => {
		if(json.message === 'Not Found'){
			throw new Error("Not Found");
		}
		return json;	
	})
}

module.exports = api;