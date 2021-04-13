## Details about exposed REST API

### We will be exposing API for each functionality mentioned in *The functions that the library management system can do* (Top level README)


## Details about Schema Structures
1. Booklist Schema Structure
```js
let schema = {
	"bookId": uuid,
	"title":string,
	"authors": string,
	"publisher": string,
	"bookCopy":[
		{
		"bookCopyId": (bookid +'/'+ uuid),
		"isBorrowed": bool,
		"dueDate": Date
		}
	]
	"rack":[
		null,
		bookCopyId
	]
}
```

2. User Schema Structure
```js
let schema = {
	"userId": uuid,
	"username": string,
	"booksBorrowed":[
		null,
		bookCopyId
	]
}
```
