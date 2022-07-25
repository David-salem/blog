import "./TweetMessage.css";

export const TweetMessage = ({ content, date }) => {
    return (
        <div className="box-message">
            <div className="information">
                <p className="name">yonatan</p>
                <p className="date">{ date }</p>
            </div>
            <div align="left" className="message">
                {content}
            </div>
        </div>
    )
};