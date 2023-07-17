import Card from "./Card.js";
import Api from "./Api.js";

let posts = []
let users = []




async function main() {
	try {
		posts = await Api.getPosts()
		users = await Api.getUsers()
		document.querySelector(".loading").style.display = "none"
		renderFeed()
	} catch (e) {
		console.log(e)
	}
}

function renderFeed() {
	document.querySelector(".box").innerHTML = ""
	// console.log('posts :>> ', posts);
	posts.forEach((p, index) => {
		let user = users.find(u => u.id === p.userId)
		let card = new Card(p, user, posts)
		document.querySelector(".box").append(card.render())
	})

}
document.getElementById("btn-show-add-modal").addEventListener("click", () => {
	let form = document.querySelector(".add-modal")
	if (form.style.display == "flex") {
		form.style.display = "none"
	} else {
		form.style.display = "flex"
	}
})

document.querySelector(".add-modal__btn--add").addEventListener('click', (e) => {
	e.preventDefault()
	console.log(users.find(u => u.id == 1).username)
	posts.unshift({
		id: Date.now(),
		title: document.querySelector("input").value,
		body: document.querySelector("textarea").value,
		userId : 1,
	})
	document.querySelector("input").value = ""
	document.querySelector("textarea").value = ""
	document.querySelector(".add-modal").style.display = "none"
	renderFeed()
})



function AddPost() {
	try {
		Api.AddPost()
		posts.push({
			id: Math.floor(Date.now()),
			title: document.querySelector(".add-modal__title").value,
			body: document.querySelector(".add-modal__body").value,
			username: "nih1t",
			name: "Nihat"
		})
	} catch (e) {
		console.log("Couldn't add")
	}
}


main()


