import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
    const { id, image, title, description, address} = props;
    return (
        <section className={classes.detail}>
            <img src={image} alt={title}/>
            <h1>{title}</h1>
            <p>{description}</p>
        </section>
    )
};



export default MeetupDetail;