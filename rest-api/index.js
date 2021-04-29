const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db_url } = require('./config/db_config');
const route_conf = require('./routes');
const { routes } = route_conf;
const auth = require('./middleware/auth');
const { addBook } = require('./BookListActions/addBook');
const { removeBook } = require('./BookListActions/removeBook');
const { borrowBook } = require('./BookListActions/borrowBook');
const { listUserBook } = require('./BookListActions/listUserBook');
const { returnBook } = require('./BookListActions/returnBook');
const { searchBook } = require('./BookListActions/searchBook');
const { registerUser } = require('./User/registerUser');
const { loginUser } = require('./User/loginUser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8000;

// db connection
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  console.log('connection error', err);
});
mongoose.connection.on('connected', (err, res) => {
  console.log('mongoose is connected');
});

app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`);
});

// Routers handler
app.post(routes.ADD_BOOK, addBook);
app.post(routes.REMOVE_BOOK, removeBook);
app.post(routes.BORROW_BOOK, borrowBook);
app.post(routes.RETURN_BOOK, returnBook);
app.post(routes.LIST_USER_BOOK, listUserBook);
app.post(routes.SEARCH_BOOK, searchBook);
app.post(routes.REGISTER_USER, registerUser);
app.get(routes.LOGIN_USER, auth, loginUser);
