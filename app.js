import Card from "./Card.js";
import Api from "./Api.js";


// const toggleCardModal = Card.toggleCardModal

// toggleCardModal()

async function main() {
	try {
		const posts = await Api.getPosts()
		const users = await Api.getUsers()
		posts.forEach( (p,index) => {
			let user = users.filter(u => u.id === p.userId)[0]
			let card = new Card(p, user)
			document.querySelector(".box").insertAdjacentHTML("beforebegin",card.render())
		})

		Card.attachToggleModal()

		console.log({ posts, users })
	} catch (e) {
		console.log(e)
	}
}


main()


