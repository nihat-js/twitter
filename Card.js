import Api from "./Api.js"

export default class Card {
	constructor(postObj,userObj){
		this.id = postObj.id
		this.title = postObj.title
		this.body = postObj.body
		this.username = userObj.username
		this.name = userObj.name
	}

	static openModalDataId= null
	
	static attachToggleModal (){
		document.querySelectorAll(".card__options").forEach(el =>{
			el.addEventListener("click",()=>{
				let status = el.nextElementSibling.style.display
				
				if ( this.openModalDataId ){
					document.querySelector(`.card__modal[data-id='${this.openModalDataId}']`).style.display = "none"
				}

				if (status == "block"){
					el.nextElementSibling.style.display = "none"
				}else{
					el.nextElementSibling.style.display = "block"
					this.openModalDataId = el.nextElementSibling.dataset.id
					// console.log(this.openModalDataId)
				}
			})
		})
	}

	static attachDeletePostListener(){
		document.querySelectorAll(".card__modal__btn--delete").forEach(el =>{
			el.addEventListener("click",()=>{
				let id = el.parentElement.dataset.id
				console.log(id)
				Api.deletePost()
			})
		})
	}

	render(){
		return `
		<div class="card">
		<header class="card__header">
				<div class="card__header__left">
						<div class="card__avatar">
								<img src="./img/avatar-1.svg" alt="">
						</div>
						<div>
								<h3 class="card__username"> @${this.username} </h3>
								<p class="card__name"> ${this.name} </p>
						</div>
				</div>
				<div class="card__header__right">
						<img  class="card__options" src="./img/menu.svg" alt=""  >
						<div class="card__modal" data-id="${this.id}" >
							<button class="card__modal__btn card__modal__btn--delete  "> Delete post   </button> 
							<button class="card__modal__btn card__modal__btn--report ">  Report post </button> 
						</div>
				</div>
		</header>
		<div class="card__body">
				<p class="card__text"> 	${this.body}			</p>
		</div>
</div>`
		
	}
}



