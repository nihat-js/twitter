import Card from "./Card.js";
import { getPosts } from "./Api.js";

const posts = []
const users = []


async function main(){
	try{
		posts = getPosts()
	}
	await getPosts().then((data) => {
		console.log(data)
	})
}


main()