export function getPosts() {
	return new Promise((resolve, reject) => {
		fetch("https://ajax.test-danit.com/api/json/posts")
			.then((data => data.json()))
			.then((data) => {

				resolve(data)
			})
	})
}
export function getPosts() {
	return new Promise((resolve, reject) => {
		fetch("https://ajax.test-danit.com/api/json/posts")
			.then((data => data.json()))
			.then((data) => {

				resolve(data)
			})
	})
}



export function deletePost(){
  return new Promise((resolve, reject) => {
		fetch("https://ajax.test-danit.com/api/json/posts",{
      method : "DELETE"
    })
			.then((data => data.json()))
			.then((data) => {

				resolve(data)
			})
	}) 
}
