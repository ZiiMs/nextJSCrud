import express from 'express';
import { insert, findAll, findTitle, remove, update } from './mongodb';
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		message: 'Working',
	});
});

app.post('/insert', async (req, res) => {
	const { title, body, user } = req.body;
	const result = await insert({ title, body, user });
	res.json({
		message: 'Inserted!',
		post: result,
	});
});

app.post('/update', async (req, res) => {
	const { title, body, user, id } = req.body;
	update({ title, body, user }, id);
	res.json({
		message: 'Updated!',
	});
});

app.post('/delete', async (req, res) => {
	const { id } = req.body;
	console.log(req.body);
	const result = await remove(id);
	if (result) {
		res.json({
			message: `Deleted document ${id}!`,
			success: true,
		});
	} else {
		res.json({
			message: `No documents found!`,
			success: false,
		});
	}
});

app.get('/fetchAll', async (req, res) => {
	const cursor = await findAll();
	res.json({
		data: cursor,
	});
});

app.get('/find', async (req, res) => {
	let { title } = req.body;
	const cursor = await findTitle(title);
	res.json({
		message: cursor,
	});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`🔥[server]: Server is running at http://localhost:${PORT}`);
});
