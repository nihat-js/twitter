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
	Card.setPosts = posts
	Card.setRenderFeed = renderFeed
	posts.forEach((p, index) => {
		let user = users.find(u => u.id === p.userId)
		let card = new Card(p, user)
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

document.querySelector(".add-modal__btn--add").addEventListener('click', async (e) => {
	e.preventDefault()
	let obj ={
		id: Date.now(),
		title: document.querySelector("input").value,
		body: document.querySelector("textarea").value,
		userId: 1,
	}
	try {
		await Api.addPost(obj)
		posts.unshift(obj)
		document.querySelector("input").value = ""
		document.querySelector("textarea").value = ""
		document.querySelector(".add-modal").style.display = "none"
		renderFeed()

	} catch (e) {
		console.log("Error in POST Request")
	}
})





main()


