export default class Api {


	static baseURL = "https://ajax.test-danit.com/"

	static getPosts() {
		return new Promise((resolve, reject) => {
			fetch(this.baseURL + "api/json/posts")
				.then((data => data.json()))
				.then((data) => {
					console.log({data})
					resolve(data)
				})
		})
	}

	static getUsers() {
		return new Promise((resolve, reject) => {
			fetch(this.baseURL + "api/json/users")
				.then((data => data.json()))
				.then((data) => {

					resolve(data)
				})
		})
	}



	static deletePost(id) {
		return new Promise((resolve, reject) => {
			fetch(this.baseURL + "api/json/posts/" + id, {
				method: "DELETE"
			})
				.then((response) => {
					// console.log("duz deyil	")
					if (response.ok) {
						resolve(response)
					} else {
						reject(response)
					}
				})
		})
	}


	static addPost() {
		return new Promise((resolve, reject) => {
			fetch(this.baseURL + "api/json/posts/" + id, {
				method: "DELETE"
			})
				.then((response) => {
					// console.log("duz deyil	")
					if (response.ok) {
						resolve(response)
					} else {
						reject(response)
					}
				})
		})
	}

	static async ediPost(){
		try {
			let response = await fetch (this.baseURL + "api/json/posts",{ method : "PUT"})
			if (response.ok){
				return true
			}else{
				return false
			}
		}catch(e){
			console.log("Couldn't edit a post",e)
		}
	}


}



