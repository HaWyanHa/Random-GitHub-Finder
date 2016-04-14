(function (argument) {

	var myToken;
	// load();
	var users = JSON.parse(localStorage.getItem('users'));
	users.forEach(function(key){
		$("#contributors ul")
			.append($("<li>").text(key.username))
			.append($("<img>").attr("src", key.picture));
	});



	$(".clear").on("click", function clear (event){
		$("#search")[0].reset();
	});

	$("#search").on("submit", function(event){
		event.preventDefault();
		console.log("working");

		myToken = $("#api-key").val();
		var myUrl = $("#query").val();
		makeFirstAjax(myToken, myUrl)
			.then(doneFirstAjax)
			.then(handleCommits)
			.fail(failure);

	});

	function makeFirstAjax(token, url){
		return $.ajax({
			url: "https://api.github.com/search/repositories?q=" + url,
			dataType: "json",
			headers: {
				authorization: "token " + token
				},
		});
	};

	function doneFirstAjax(data){
		var i = Math.floor(Math.random() * data.items.length);
		console.log(data.items[i]);
		var q = data.items[i].full_name;
		console.log(q);
		return makeSecondAjax(q);
	};

	function makeSecondAjax(doneFirstAjax){
		return $.ajax({
			type: "GET",
			url:"https://api.github.com/repos/" + doneFirstAjax + "/commits",
			dataType: "json",
			headers: {
				authorization: "token " + myToken
				},
		})
		console.log(data);
	}

	function handleCommits(data){
		console.log(data);
		var i = Math.floor(Math.random() * data.length);
		var p = data[i].author.login;
		var a = data[i].author.avatar_url;
		storeNewData(p, a);
		return appendUi(p, a);
	};

	function appendUi(username, picture){
		$("#contributors").find("ul").append($("<li>").text(username));
		console.log(username);
		$("#contributors").find("ul").append($("<li>").append("<img id='theImg' src=" + picture + "/>"));
	}

	// localStorage.setItem("user", JSON.stringify({"name":"[i]"}))
	function storeNewData (login, picture){
       users = JSON.parse(localStorage.getItem('users'));
        if (!users) {
            users = [];
        }

        user = {
        	username: login,
        	picture: picture
        };

        users.push(user);

        // userData = userData.concat(  );
        localStorage.setItem( 'users', JSON.stringify(users) );


        // $('.results').append( JSON.stringify( data.results ) );
        // if (data.next) {
        //     return getData( 'data-' + data.next + '.json' );
        //  } else {
        //      return 'no more results!';
        //  }
	}
	
	// function load (users){
	// JSON.parse(localStorage.getItem("users"));

	// 	for (var i = 0; i < users.length; i++) {
	// 		$("#contributors").find("ul").append($("<li>").text(users[i].username));
	// 		$("#contributors").find("ul").append($("<li>").append("<img id='theImg' src=" + users[i].picture + "/>"));

	// 	}

	// };



	function failure(){
		console.err("Problems")
		$("#contributors").find("ul").append($("<li>").text("Problems"));

	};


})();