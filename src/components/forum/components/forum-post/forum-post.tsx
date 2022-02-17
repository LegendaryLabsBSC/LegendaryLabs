import React from 'react'

export interface ForumPostBaseProps {
    id: string
    topic: string
    thread: string
    user: string
    role: string
    header: string
    post: string
    date: string
}

export interface ForumPostProps extends ForumPostBaseProps {
}

export const ForumPost: React.FC<ForumPostProps> = ({
    user,
    role,
    post,
    date,
    header,
}) => {
    return (
        <li>
            <div className="nk-forum-topic-author">
                <img src="assets/images/phoenixSilhouette_white.png" alt="Lesa Cruz" />
                <div className="nk-forum-topic-author-name" title="Lesa Cruz">
                    <a href="#">{ user }</a>
                </div>
                <div className="nk-forum-topic-author-role">{ role }</div>
                {/* <div className="nk-forum-topic-author-since"> Member since January 13, 2017 </div> */}
            </div>
            <div className="nk-forum-topic-content">
                <h4 className="h5">{ header }</h4>
                <div className="nk-forum-topic-attachments"><p>{ post }</p></div>
                {/* 
                    <a href="#">godlike-free.zip</a>
                    <br /> (14.86 MiB) Downloaded 185 times
                </div> */}
            </div>
            <div className="nk-forum-topic-footer">
                <span className="nk-forum-topic-date">{ new Date(date).toDateString() }</span>
                <span className="nk-forum-action-btn">
                    <a href="#forum-reply" className="nk-anchor"><span className="fa fa-reply"></span> Reply</a>
                </span>
                <span className="nk-forum-action-btn">
                    <a href="#"><span className="fa fa-flag"></span> Spam</a>
                </span>
                <span className="nk-forum-action-btn">
                    <span className="nk-action-heart">
                        <span className="num">18</span>
                        <span className="like-icon ion-android-favorite-outline"></span>
                        <span className="liked-icon ion-android-favorite"></span> Like </span>
                </span>
            </div>
        </li>
    )
}
