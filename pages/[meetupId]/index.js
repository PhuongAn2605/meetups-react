import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';

function MeetupDetails(props) {

    
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name='description' content={props.meetupData.description}></meta>
            </Head>
            <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
        </Fragment>
    )

};

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb://localhost:27017/meetups');
    const db = client.db();

    const meetupsCollection = await db.collection('meetups');

    console.log('Connected to db');

    //get array of id
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();


    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString()}
        }))
    }
}

export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb://localhost:27017/meetups');
    const db = client.db();

    const meetupsCollection = await db.collection('meetups');

    console.log('Connected to db')
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

    client.close();
    // console.log(meetupId);

    

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails;