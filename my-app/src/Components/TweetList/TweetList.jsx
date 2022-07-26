import './TweetList.css';
import { TweetMessage } from '../TweetMessage/TweetMessage.jsx';

export const TweetList = ({ tweet }) => {
    return (
        <div className="box-list">
                    {tweet.map((tweet) => (
                        <TweetMessage
                        key={ tweet.id}
                        id={ tweet.id } 
                        content={ tweet.content } 
                        date={ tweet.date }
                        userName={ tweet.userName }
                        />
                    ))}
        </div>
    )
};