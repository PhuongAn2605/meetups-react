import { MongoClient } from 'mongodb';

async function handler(req, res){

    if(req.method === 'POST'){

        const data = req.body;

        const client = await MongoClient.connect('mongodb://localhost:27017/meetups');
        const db = client.db();

        const meetupsCollection = await db.collection('meetups');

        console.log('Connect to db!')
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted! '})
    }
};

export default handler;