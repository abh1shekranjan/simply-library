# simply-library
A Library Management System.

## A Web App application for the library management system with the following requirements.

1. Details about the Library:
    1. The library will have one or more copies of multiple books
    1. The library will have multiple racks and each rack can contain at most one copy of any book.
2. Each book will have the following properties:
    1. Book ID
    2. Title
    3. Authors
    4. Publishers
3. Details about Book Copies
    1. There could be multiple copies of the same book.
    2. Each book copy will have a unique ID.
    3. Each book copy will be placed on a rack.
    4. Each book copy can be borrowed by a user with a specific due date.
4. Every rack will have a unique rack number (numbered serially from 1 to n where n is the total number of racks).
5. Details about User:
   1. User details: User ID, Name
   2. A user can borrow a maximum of 5 books.
### The functions that the library management system can do:
Create a library.
1. Add a book to the library. The book should be added to the first available rack.
2. Remove a book copy from the library.
3. Allow a user to borrow a book copy given the book id, user id, and due date. The first available copy based on the rack number should be provided.
4. Allow a user to borrow a book copy given the book copy id, user id, and due date.
5. Allow a user to return a book copy given the book copy id. The book should be added to the first available rack.
6. Allow a user to print the book copy ids of all the books borrowed by them.
7. Allow a user to search for books using few book properties (Book ID, Title, Author, Publisher). Searching should return details about all the book copies that match the search query.