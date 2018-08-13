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

/* Drag N' Drop */

function dragstart_handler(ev) {
	// Add the target element's id to the data transfer object
	ev.dataTransfer.setData("text/plain", ev.target.id);
	ev.dropEffect = "move";
}

function dragover_handler(ev) {
	ev.preventDefault();
	// Set the dropEffect to move
	ev.dataTransfer.dropEffect = "move"
}

function drop_handler(ev) {
	ev.preventDefault();
	// Get the id of the target and add the moved element to the target's DOM
	let data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
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