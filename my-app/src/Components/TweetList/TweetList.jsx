import './TweetList.css';
import React, { useContext } from "react";
import { stateContext } from "../../Utils/context";

export const TweetList = () => {
    const { objectTweet } = useContext(stateContext);
    return (
        <div className="box-list">
                    {objectTweet.map((objectTweet) => (
                            <div className="box-message" key={objectTweet.id}>
                                <div className="information">
                                    <p className="name">{ objectTweet.userName }</p>
                                    <p className="date">{ objectTweet.date }</p>
                                </div>
                                <div align="left" className="message">
                                    {objectTweet.content}
                                </div>
                            </div>
                    ))}
        </div>
    )
};