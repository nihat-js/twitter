	// static attachToggleModal() {
	// 	document.querySelectorAll(".card__options").forEach(el => {
	// 		el.addEventListener("click", () => {
	// 			let status = el.nextElementSibling.style.display

	// 			if (this.openModalDataId) {
	// 				document.querySelector(`.card__modal[data-id='${this.openModalDataId}']`).style.display = "none"
	// 			}

	// 			if (status == "block") {
	// 				el.nextElementSibling.style.display = "none"
	// 			} else {
	// 				el.nextElementSibling.style.display = "block"
	// 				this.openModalDataId = el.nextElementSibling.dataset.id
	// 				// console.log(this.openModalDataId)
	// 			}
	// 		})
	// 	})
	// }

	// static   attachDeletePostListener(posts, renderFeed) {
	// 	document.querySelectorAll(".card__modal__btn--delete").forEach(el => {
	// 		el.addEventListener("click", () => {
	// 			let id = el.parentElement.dataset.id
	// 			try {
	// 				 Api.deletePost(id)
	// 				posts.splice(posts.findIndex(p => p.id == id), 1)
	// 				this.openModalDataId = null
	// 				renderFeed()

	// 			} catch (e) {
	// 				console.log("Failed to delete",e)
	// 			}
	// 			// posts = posts.filter(p => p.id != id) doesn't work  because filter() method creates a new array. doesn't work as pass by reference
	// 			// console.log("attachdeletelistener",posts)

	// 		})
	// 	})
	// }