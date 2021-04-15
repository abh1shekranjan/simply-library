const { db_tables } = require("../config/db_config");
const mongoose = require("mongoose");
const { ERRORS } = require("../error");


/**
 * @description Given a bookCopyId find the book and remove it.
 *              If one entry present after removing then remove the book record all togather.
 * @param {object} req 
 * @param {object} res 
 */
function removeBook(req, res) {

    // get the booklist db
    const userCollection = mongoose.connection.collection(db_tables.BOOK_LIST);
    const { bookCopyId } = req.body;

    // define mandatoryFields
    const mandatoryFields = [bookCopyId];

    Promise.resolve()
        .then(() => {

            // mandatory fields are missing
            if (mandatoryFields.includes(undefined)) {
                throw new Error(ERRORS.BAD_REQUEST)
            }
        })
        .then(() => userCollection.findOne({ bookId: bookCopyId.split('/')[0] }))
        .then((result) => {
            if (result) {

                // find id in bookCopy and remove the entry.
                result.bookCopy = result.bookCopy.filter(item => item.bookCopyId !== bookCopyId)

                // remove id from rack and put null
                for (let i in result.rack) {
                    if (result.rack[i] === bookCopyId) {

                        result.rack[i] = null;
                        break;
                    }
                }

                // atleast one entry is present
                if (result.bookCopy.length) {

                    return userCollection.updateOne({ "_id": result._id },
                        { $set: { "rack": result.rack, "bookCopy": result.bookCopy } });
                }
                // no book is there
                else
                    return userCollection.deleteOne({ bookId: bookCopyId.split('/')[0] })
            } else {
                throw new Error(ERRORS.BAD_REQUEST);
            }
        })
        .then((result) => {
            if ((result.result ? result.result.ok : false)) {

                console.log("book deleted successfully");
                return res.status(200).json({ "message": "Book deletion successful" });
            } else {
                throw new Error(ERRORS.INTERNAL)
            }

        })
        .catch((e) => {
            if (e.message === ERRORS.BAD_REQUEST) {
                return res.status(400).send("Bad request")
            }
            else {
                return res.status(500).send("Internal error")
            }
        })
}

module.exports = {
    removeBook
}