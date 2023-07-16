export default class Api {
	static getPosts() {
		return new Promise((resolve, reject) => {
			fetch("https://ajax.test-danit.com/api/json/posts")
				.then((data => data.json()))
				.then((data) => {

					resolve(data)
				})
		})
	}

	static getUsers() {
		return new Promise((resolve, reject) => {
			fetch("https://ajax.test-danit.com/api/json/users")
				.then((data => data.json()))
				.then((data) => {

					resolve(data)
				})
		})
	}



	static deletePost() {
		return new Promise((resolve, reject) => {
			fetch("https://ajax.test-danit.com/api/json/posts", {
				method: "DELETE"
			})
				.then((data => data.json()))
				.then((data) => {

					resolve(data)
				})
		})
	}


}



