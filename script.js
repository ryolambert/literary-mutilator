function highlightMouse() {
	document.getElementById("highlight").style.backgroundColor = "yellow";
	document.getElementById("highlight").style.fontFamily = "Monospace";
}

function unhighlightMouse() {
	document.getElementById("highlight").style.backgroundColor = "white";
	document.getElementById("highlight").style.fontFamily = "Sans-Serif";
}

/* Highlighted Search */
document.addEventListener(
	"DOMContentLoaded",
	function() {
		let searchInput = document.getElementById("inputSearch").innerHTML;
		searchInput = searchInput.toString();
		document.getElementById("search").onclick = function() {
			highlight_word(searchInput);
		};
	},
	false
);

function highlight_word(searchInput) {
	let text = document.getElementById("search_text").value;
	if (text) {
		let pattern = new RegExp("(" + text + ")", "gi");
		let new_text = searchInput.replace(
			pattern,
			"<span class='highlight'>" + text + "</span>"
		);
		document.getElementById("inputSearch").innerHTML = new_text;
	}
}

/* KeyPress Shuffle */
document.addEventListener("keydown", function(event) {
	if (
		event.code == "KeyS" &&
		(event.altKey || event.metaKey) &&
		(event.ctrlKey || event.metaKey)
	) {
		shufflize();
	}
});

/**
 * Shufflize
 * Use the .map() Array method.
 * This is an implementation of the Fisher-Yates shuffle :D
 *
 * @author Rochelle Lewis rlewis37@cnm.edu
 **/
function shufflize() {
	//grab paragraph text
	let txt = document.getElementById("shuffle").textContent;

	//split text into an array of words on the empty spaces
	let words = txt.split(" ");

	words.map(function(t) {
		for (i = words.length - 1; i > 0; i--) {
			//create a random number, no greater than the max array index of words
			let j = Math.floor(Math.random() * (i + 1));

			//swap out each array index with the random number
			let temp = words[i];
			words[i] = words[j];
			words[j] = temp;
		}

		//join the randomized words and replace the original paragraph
		document.getElementById("shuffle").textContent = words.join(" ");
	});
}

/* Rotate 13 Encryption */
$(document).ready(function() {
	$('#btn_decrypt').on('click', decrypt);
	$('#btn_encrypt').on('click', encrypt);
});

function decrypt() {
	let text = $('rot13Input').filter('#decrypt').val();
	let translated = rot13(text);
	$('rot13Input').filter('#decrypt').val('');
	$('rot13Input').filter('#encrypt').val(translated);
}

function encrypt() {
	let text = $('rot13Input').filter('#encrypt').val();
	let translated = r(text);
	$('rot13Input').filter('#encrypt').val('');
	$('rot13Input').filter('#decrypt').val(translated);
}

function r(a, b) {
	return ++b
		? String.fromCharCode(
			(a < "[" ? 91 : 123) > (a = a.charCodeAt() + 13) ? a : a - 26
		)
		: a.replace(/[a-zA-Z]/g, r);
}

$(function() {
	$("#rotate")
		.click(handleRotate)
		.trigger("click");
});

/* Drag N' Drop */

function dragstart_handler(ev) {
	// Add the target element's id to the data transfer object
	ev.dataTransfer.setData("text/plain", ev.target.id);
	ev.dropEffect = "move";
}
function dragover_handler(ev) {
	ev.preventDefault();
	// Set the dropEffect to move
	ev.dataTransfer.dropEffect = "move";
}
function drop_handler(ev) {
	ev.preventDefault();
	// Get the id of the target and add the moved element to the target's DOM
	let data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
}

/* Fetch Request to JsonPlaceholder */
function fetchJson() {
	fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
		.then(res => res.json())
		.then(data => {
			let output = "<h4> Posts </h4>";
			data.forEach(function(user) {
				output += `
			<ul>
				<li>ID: ${user.id}</li>
				<li>Title: ${user.title}</li>
				<li>Body: ${user.body}</li>
			</ul>
			`;
				document.getElementById("fetchOutput").innerHTML = output;
			});
		});
}

// modified for general rot# from
// https://stackoverflow.com/a/23317009
// credit to Lonnon Foster for fixed version and Kevin M. for original algorithm
// 1. a runs as the unencrypted string, while b is undefined
// Tests to see if anything has been passed, if not calls itself recursively until end of string.
// 2.  incrementing an undefined produces falsey output, the second ternary clause is run.
// 4. for the first time 'a' === "char" after step 3 r, ++b returns a truthy value, so the first ternary clause is run.
// 5. tests for whetherr 'a' is lower or uppercase, then shifts the character up 13 letters or returns lower or uppercase 'a' as needed.
// 3. replacer is called first, for every letter the regex captures of the original string it is then passed as the second parameter to replace().