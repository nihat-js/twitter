export default class Api {


	static baseURL = "https://ajax.test-danit.com/"

	static getPosts() {
		return new Promise((resolve, reject) => {
			fetch(this.baseURL + "api/json/posts")
			.then((response => {
				if (response.ok) {
					return response.json()
				} else {
					reject("API GET POSTS ERROR")
				}
			}))
				.then((data) => {
					// console.log({data})
					resolve(data)
				})
		})
	}

	static getUsers() {
		return new Promise((resolve, reject) => {
			fetch(this.baseURL + "api/json/users")
				.then((response => {
					if (response.ok) {
						return response.json()
					} else {
						reject("API GET USERS ERROR")
					}
				}))
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
					console.log('gelirem')
					if (response.ok) {
						resolve(response)
					} else {
						reject(response)
					}
				})
		})
	}


	static addPost(obj) {
		return new Promise((resolve, reject) => {
			fetch(this.baseURL + "api/json/posts/", {
				method: "POST",
				body: JSON.stringify(obj)
			})
				.then((response) => {
					if (response.ok) {
						resolve(response)
					} else {
						reject(response)
					}
				})
		})
	}

	static async editPost() {
		try {
			let response = await fetch(this.baseURL + "api/json/posts", { method: "PUT" })
			if (response.ok) {
				return true
			} else {
				return false
			}
		} catch (e) {
			console.log("Couldn't edit a post", e)
		}
	}


}



