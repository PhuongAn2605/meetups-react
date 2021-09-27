import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';
// const DUMMY_MEETUPS = [
//     {
//       id: 'm1',
//       title: 'A First Meetup',
//       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//       address: 'Some address 5, 12345 Some City',
//       description: 'This is a first meetup!'
//     },
//     {
//       id: 'm2',
//       title: 'A Second Meetup',
//       image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
//       address: 'Some address 10, 12345 Some City',
//       description: 'This is a second meetup!'
//     }
//   ];

  function HomePage(props) {
      return (
        <Fragment>
          <Head>
            <title>Homepage</title>
            <meta name='description' content='Find a amzing meetup.' />
          </Head>
          <MeetupList meetups={props.meetups}/>
        </Fragment>
      )
  };

  //return props for HomePage function
  export async function getStaticProps() {
    //fetch data from an API

    const client = await MongoClient.connect('mongodb://localhost:27017/meetups');
    const db = client.db();

    const meetupsCollection = await db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
              image: meetup.image,
              title: meetup.title,
              description: meetup.description,
              address: meetup.address,
              id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
  }

  export default HomePage;