import Api from "./Api.js"

export default class Card {


	/**
	 * @param {any[]} posts 
	 */
	static set setPosts(posts) {
		this.posts = posts
	}
	/**
	 * @param {Function} renderFeed
	 */
	static set setRenderFeed(renderFeed) {
		this.renderFeed = renderFeed
	}
	static openEditModeId = null
	static openModalDataId = null



	constructor(postObj, userObj,) {
		this.id = postObj.id
		this.title = postObj.title
		this.body = postObj.body
		this.username = userObj.username
		this.name = userObj.name
	}




	toggleOptionsModal(e) {
		let modal = this.element.querySelector(".card__modal")
		let status = modal.style.display
		// console.log("openModalDataId", Card.openModalDataId)
		if (Card.openModalDataId) {
			document.querySelector(`.card[data-id='${Card.openModalDataId}'] .card__modal`).style.display = "none"
		}

		if (status == "block") {
			modal.style.display = "none"
		} else {
			modal.style.display = "block"
			Card.openModalDataId = modal.dataset.id
		}

	}

	async deletePost() {
		try {
			// posts = posts.filter(p => p.id != id) doesn't work  because filter() method creates a new array. doesn't work as pass by reference
			console.log(this)
			await Api.deletePost(this.id)
			Card.posts.splice(Card.posts.findIndex(p => p.id == this.id), 1)
			this.openModalDataId = null
			Card.renderFeed()

		} catch (e) {
			console.log("Failed to delete card", e)
		}
	}

	editPost() {
		let obj = {}
		try {
			Api.ediPost(id, obj)
		} catch (e) {
			console.log("Failed edit card", e)
		}
	}

	toggleEditPost() {
		this.toggleOptionsModal()
		// console.log(Card.openEditModeId)
		if (Card.openEditModeId) {
			document.querySelector(`.card[data-id="${Card.openEditModeId}"] .card__actions `).style.display = "none"
		}
		let el = document.querySelector(`.card[data-id="${this.id}"] .card__actions `)
		if (el.style.display == "flex") {
			el.style.display = "none"
			Card.openEditModeId = null
		} else {
			el.style.display = "flex"
			let titleEl = this.element.querySelector(".card__title")
			let textEl = this.element.querySelector(".card__text")

			titleEl.contentEditable = true
			titleEl.style.borderBottom = "2px solid #337eac"

			textEl.contentEditable = true
			textEl.style.borderBottom = "2px solid #337eac"



			Card.openEditModeId = this.id
		}
	}

	async handleSave() {
		let titleEl = this.element.querySelector(".card__title")
		let textEl = this.element.querySelector(".card__text")
		try {
			await Api.editPost({
				id: this.id,
				title: this.element.querySelector(".card__title").value,
				body: this.element.querySelector(".card__text").value,
				username: this.username,
				name: this.name,
			})



		} catch (e) {
			console.log("Failed to save", e)
		} finally {
			document.querySelector(`.card[data-id="${this.id}"] .card__actions `).style.display = "none"
			titleEl.contentEditable = false
			titleEl.style.borderBottom = "none"

			textEl.contentEditable = false
			textEl.style.borderBottom = "none"

		}
	}

	handleCancel() {
		let titleEl = this.element.querySelector(".card__title")
		let textEl = this.element.querySelector(".card__text")

		titleEl.contentEditable = false
		titleEl.style.borderBottom = "none"
		titleEl.innerText = this.title

		textEl.contentEditable = false
		textEl.style.borderBottom = "none"
		textEl.innerText = this.body

		// console.log('b')
		document.querySelector(`.card[data-id="${this.id}"] .card__actions `).style.display = "none"
	}



	render() {

		let cardDiv = document.createElement('div')
		cardDiv.classList = "card"
		cardDiv.dataset.id = this.id
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
		cardUsername.innerText += "@" + this.username

		let cardName = document.createElement("p")
		cardName.classList = "card__name"
		cardName.innerText += this.name

		let cardHeaderRight = document.createElement("div")
		cardHeaderRight.classList = "card__header__right"

		let optionsImg = document.createElement("img")
		optionsImg.src = "./img/menu.svg"
		optionsImg.classList = "card__options"
		optionsImg.onclick = this.toggleOptionsModal.bind(this)

		let cardModal = document.createElement("div")
		cardModal.dataset.id = this.id
		cardModal.classList = "card__modal"

		let editBtn = document.createElement("button")
		editBtn.classList = "card__modal__btn card__modal__btn--edit"
		editBtn.innerText = "Edit"
		editBtn.onclick = this.toggleEditPost.bind(this)

		let deleteBtn = document.createElement("button")
		deleteBtn.classList = "card__modal__btn card__modal__btn--delete"
		deleteBtn.innerText = "Delete"
		deleteBtn.onclick = this.deletePost.bind(this)

		let cardBody = document.createElement("div")
		cardBody.classList = "card__body"

		let cardTitle = document.createElement("h2")
		cardTitle.classList = "card__title"
		cardTitle.innerText = this.title

		let cardText = document.createElement("p")
		cardText.classList = "card__text"
		cardText.innerText = this.body

		let cardActions = document.createElement("div")
		cardActions.classList = "card__actions"

		let btnCancel = document.createElement("button")
		btnCancel.innerText = "Cancel"
		btnCancel.addEventListener("click", this.handleCancel.bind(this))
		btnCancel.classList = "card__cancel"
		let btnSave = document.createElement("button")
		btnSave.innerText = "Save"
		btnSave.classList = "card__save"
		btnSave.addEventListener('click', this.handleSave.bind(this))


		cardAvatar.append(avatarImg)
		cardAuthor.append(cardUsername, cardName)

		cardHeaderLeft.append(cardAvatar, cardAuthor)

		cardModal.append(deleteBtn, editBtn)

		cardHeaderRight.append(optionsImg, cardModal)

		cardHeader.append(cardHeaderLeft, cardHeaderRight)

		cardBody.append(cardTitle, cardText)

		cardActions.append(btnCancel, btnSave)

		cardDiv.append(cardHeader, cardBody, cardActions)

		this.element = cardDiv

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



