## Details about exposed REST API

### We will be exposing API for each functionality mentioned in *The functions that the library management system can do* (Top level README)

1. booklist schema structure
```js
let schema = {
	"bookid": uuid
	"title":string
	"Authors": string
	"publisher": string
	"bookCopy":[
		null,
	    bookCopyUuid
	]
}
```
