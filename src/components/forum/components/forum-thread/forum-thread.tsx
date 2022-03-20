import React from 'react'

export interface ForumThreadBaseProps {
    id: string
    topic: string
    title: string
    subtitle: string
    numberThreads: number
    previewTitle: string
    previewDate: string
}

export interface ForumThreadProps extends ForumThreadBaseProps {
    setThread: (id: string) => void
}

export const ForumThread: React.FC<ForumThreadProps> = ({
    id,
    title,
    subtitle,
    numberThreads,
    previewTitle,
    previewDate,
    setThread
}) => {
    return (
        <li>
            <div className="nk-forum-icon">
                <span className="ion-ios-game-controller-b" />
            </div>
            <div className="nk-forum-title">
                <h3><a onClick={() => setThread(id)}>{ title }</a></h3>
                <div className="nk-forum-title-sub">{ subtitle }</div>
            </div>
            <div className="nk-forum-count">{ numberThreads } posts </div>
            <div className="nk-forum-activity-avatar">
                <img src="assets/images/phoenixSilhouette_white.png" alt="Lesa Cruz"/>
            </div>
            <div className="nk-forum-activity">
                <div className="nk-forum-activity-title" title={ previewTitle }>
                    <a  onClick={() => setThread(id)}>{ previewTitle }</a>
                </div>
                <div className="nk-forum-activity-date"> { new Date(previewDate).toDateString() } </div>
            </div>
        </li>
    )
}
