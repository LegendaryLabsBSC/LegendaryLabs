import React from 'react'

export interface ForumTopicProps {
    title: string
    subtitle: string
    numberThreads: number
    previewTitle: string
    previewDate: Date
}

export const ForumTopic: React.FC<ForumTopicProps> = ({
    title,
    subtitle,
    numberThreads,
    previewTitle,
    previewDate
}) => {
    return (
        <li>
            <div className="nk-forum-icon">
                <span className="ion-ios-game-controller-b" />
            </div>
            <div className="nk-forum-title">
                <h3><a href="forum-topics.html">{ title }</a></h3>
                <div className="nk-forum-title-sub">{ subtitle }</div>
            </div>
            <div className="nk-forum-count">{ numberThreads } threads </div>
            <div className="nk-forum-activity-avatar">
                <img src="assets/images/forum.jpg" alt="Lesa Cruz"/>
            </div>
            <div className="nk-forum-activity">
                <div className="nk-forum-activity-title" title="GodLike the only game that I want to play!">
                    <a href="forum-single-topic.html">{ previewTitle }</a>
                </div>
                <div className="nk-forum-activity-date"> { previewDate.toDateString() } </div>
            </div>
        </li>
    )
}
