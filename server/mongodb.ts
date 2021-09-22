import { MongoClient, ObjectId } from 'mongodb';

require('dotenv').config();
const uri = process.env.DB_URL!;

const client = new MongoClient(uri);

interface post {
  title: string;
  body: string;
  user: string;
  time?: string;
}

export async function findAll() {
  try {
    await client.connect();

    const db = client.db('ZiiMCrud');

    const posts = db.collection<post>('post');

    const results = posts.find();
    return await results.toArray();
  } finally {
    await client.close();
  }
}

export async function findTitle(title: string) {
  try {
    await client.connect();

    const db = client.db('ZiiMCrud');

    const posts = db.collection<post>('post');

    const results = posts
      .find<post>({
        $text: { $search: title },
      })
      .sort({ score: { $meta: 'textScore' } });
    return await results.toArray();
  } finally {
    await client.close();
  }
}

export async function update(data: post, id: string) {
  try {
    const { title, body, user } = data;
    await client.connect();

    const db = client.db('ZiiMCrud');

    const posts = db.collection<post>('post');
    const result = await posts.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          body: data.body,
          title: data.title,
          user: data.user,
        },
      }
    );
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } finally {
    await client.close();
  }
}

export async function insert(data: post) {
  try {
    const { title, body, user } = data;
    await client.connect();

    const db = client.db('ZiiMCrud');

    const posts = db.collection<post>('post');

    let current = new Date();
    let dateTime =
      current.getFullYear() +
      '-' +
      (current.getMonth() + 1) +
      '-' +
      current.getDate() +
      ' ' +
      current.getHours() +
      ':' +
      current.getMinutes() +
      ':' +
      current.getSeconds();
    const result = await posts.insertOne({
      title,
      body,
      user,
      time: dateTime,
    });
    console.log(`Inserted ID: ${result.insertedId}`);
    return { title, body, user, time: dateTime, _id: result.insertedId };
  } finally {
    await client.close();
  }
}

export async function remove(id: ObjectId) {
  try {
    await client.connect();

    const db = client.db('ZiiMCrud');

    const posts = db.collection<post>('post');
    const result = await posts.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      console.log('Successfully deleted one document');
      return true;
    } else {
      console.log('No documents deleted.');
      return false;
    }
  } finally {
    await client.close();
  }
}
