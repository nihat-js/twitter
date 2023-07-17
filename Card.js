import Api from "./Api.js"

export default class Card {
	constructor(postObj, userObj, posts) {
		this.id = postObj.id
		this.title = postObj.title
		this.body = postObj.body
		this.username = userObj.username
		this.name = userObj.name
		this.posts = posts
	}

	static openModalDataId = null



	toggleModal(e) {
		let modal   = e.target.nextElementSibling
		let status = modal.style.display
		if (this.openModalDataId) {
			document.querySelector(`.card__modal[data-id='${this.openModalDataId}']`).style.display = "none"
		}

		if (status == "block") {
			modal.style.display = "none"
		} else {
			modal.style.display = "block"
			this.openModalDataId = modal.dataset.id
			// console.log(this.openModalDataId)
		}
	
}

deletePost() {
	try {
		// posts = posts.filter(p => p.id != id) doesn't work  because filter() method creates a new array. doesn't work as pass by reference
		Api.deletePost(id)
		posts.splice(posts.findIndex(p => p.id == id), 1)
		this.openModalDataId = null
		renderFeed()

	} catch (e) {
		console.log("Failed to delete card", e)
	}
}

editPost(){
	let obj = {}
	try {
		Api.ediPost(id, obj)
	} catch (e) {
		console.log("Failed edit card", e)
	}
}


render() {

	let cardDiv = document.createElement('div')
	cardDiv.classList = "card"
	let cardHeader = document.createElement("header")
	cardHeader.classList = "card__header"
	let cardHeaderLeft = document.createElement("header")
	cardHeaderLeft.classList = "card__header__left"
	let cardAvatar = document.createElement('div')
	cardAvatar.classList = "card__avatar"
	let avatarImg = document.createElement('img')
	avatarImg.src = "./img/avatar-" + (this.username.charCodeAt(0) % 5 + 1) + ".svg"
	let cardAuthor = document.createElement('div')
	cardAuthor.classList = "card__author"

	let cardUsername = document.createElement("h3")
	cardUsername.classList = "card__username"
	cardUsername.innerText += this.username

	let cardName = document.createElement("h3")
	cardName.classList = "card__name"
	cardName.innerText += this.name

	let cardHeaderRight = document.createElement("div")
	cardHeaderRight.classList = "card__header__right"

	let optionsImg = document.createElement("img")
	optionsImg.src = "./img/menu.svg"
	optionsImg.classList = "card__options"
	optionsImg.onclick = this.toggleModal

	let cardModal = document.createElement("div")
	cardModal.dataset.id = this.id
	cardModal.classList = "card__modal"

	let editBtn = document.createElement("button")
	editBtn.classList = "card__modal__btn card__modal__btn--edit"
	editBtn.innerText = "Edit"

	let deleteBtn = document.createElement("button")
	deleteBtn.classList = "card__modal__btn card__modal__btn--delete"
	deleteBtn.innerText = "Delete"
	deleteBtn.onclick = this.deletePost

	let cardBody = document.createElement("div")
	cardBody.classList = "card__body"

	let cardText = document.createElement("p")
	cardText.classList = "card__text"
	cardText.innerText = this.body

	let cardActions = document.createElement("div")
	cardActions.classList = "card__actions"

	let btnCancel = document.createElement("button")
	btnCancel.innerText = "Cancel"

	let btnSave = document.createElement("button")
	btnSave.innerText = "Save"


	cardAvatar.append(avatarImg)
	cardAuthor.append(cardUsername, cardName)

	cardHeaderLeft.append(cardAvatar, cardAuthor)

	cardModal.append(deleteBtn, editBtn)

	cardHeaderRight.append(optionsImg, cardModal)

	cardHeader.append(cardHeaderLeft, cardHeaderRight)

	cardBody.append(cardText)

	cardActions.append(btnCancel, btnSave)




	cardDiv.append(cardHeader, cardBody, cardActions)

	return cardDiv


	// 		 `
	// 		<div class="card">
	// 		<header class="card__header">
	// 				<div class="card__header__left">
	// 						<div class="card__avatar">
	// 								<img src="./img/avatar-${this.username.charCodeAt(0) % 5 + 1}.svg" alt="">
	// 						</div>
	// 						<div class="card_author>
	// 								<h3 class="card__username"> @${this.username} </h3>
	// 								<p class="card__name"> ${this.name} </p>
	// 						</div>
	// 				</div>
	// 				<div class="card__header__right">
	// 						<img  class="card__options" src="./img/menu.svg" alt=""  >
	// 						<div class="card__modal" data-id="${this.id}" >
	// 							<button class="card__modal__btn card__modal__btn--delete  "> Delete post   </button> 
	// 							<button class="card__modal__btn card__modal__btn--report ">  Report post </button> 
	// 						</div>
	// 				</div>
	// 		</header>
	// 		<div class="card__body">
	// 				<p class="card__text"> 	${this.body}			</p>
	// 		</div>
	// <div class=".card__actions">
	// btn cancel
	// btn save
	// </div>
	// </div>`

}
}



