function highlightMouse() {
	document.getElementById("highlight").style.backgroundColor = 'yellow';
	document.getElementById("highlight").style.fontFamily = 'Monospace';
}

function unhighlightMouse() {
	document.getElementById("highlight").style.backgroundColor = 'white';
	document.getElementById("highlight").style.fontFamily = 'Sans-Serif';
}

/**********************************
 Highlighted Search
 **********************************/
document.addEventListener('DOMContentLoaded', function() {
	var searchInput = document.getElementById("inputSearch").innerHTML;
	searchInput = searchInput.toString();
	document.getElementById("search").onclick = function() {
		highlight_word(searchInput)
	};
}, false);

function highlight_word(searchInput) {
	var text = document.getElementById("search_text").value;
	if(text) {
		var pattern = new RegExp("(" + text + ")", "gi");
		var new_text = searchInput.replace(pattern, "<span class='highlight'>" + text + "</span>");
		document.getElementById("inputSearch").innerHTML = new_text;
	}
}

/* Fetch Request to JsonPlaceholder */
function fetchJson() {
	fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
		.then(res => res.json())
		.then((data) => {
			let output = '<h4> Posts </h4>';
			data.forEach(function(user) {
				output += `
			<ul>
				<li>ID: ${user.id}</li>
				<li>Title: ${user.title}</li>
				<li>Body: ${user.body}</li>
			</ul>
			`;
				document.getElementById('fetchOutput').innerHTML = output
			});
		});
}