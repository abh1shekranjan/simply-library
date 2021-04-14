const db_name = 'library';
const db_password = 'sGsSx5wLpEKQHanr';
const db_username = "satadhi";

const db_tables = {
    BOOK_LIST: 'booklist',
    USER_LIST: 'userlist'
}
const db_url = `mongodb+srv://${db_username}:${db_password}@cluster0.qzyxe.mongodb.net/${db_name}?retryWrites=true&w=majority`;

module.exports = {
    db_url,
    db_tables
}