import React from 'react'
import { ForumTopic, ForumTopicProps } from './components'

export const Forum: React.FC = () => {
    const topics: ForumTopicProps[] = [
        {
            title: 'Main Game Discussions',
            subtitle: 'Be seed is air female greater was multiply saying great',
            numberThreads: 1267,
            previewTitle: 'GodLike the only game that I want to play!',
            previewDate: new Date('September 11, 2017')
        },
        {
            title: 'Main Game Discussions',
            subtitle: 'Be seed is air female greater was multiply saying great',
            numberThreads: 1267,
            previewTitle: 'GodLike the only game that I want to play!',
            previewDate: new Date('September 11, 2017')
        }
    ]

    return (
        <>
            <div className="nk-header-title nk-header-title-sm nk-header-title-parallax nk-header-title-parallax-opacity">
                <div className="bg-image">
                    <img src="assets/images/forum.jpg" alt="" className="jarallax-img"/>
                </div>
                <div className="nk-header-table">
                    <div className="nk-header-table-cell">
                        <div className="container">
                            <h1 className="nk-title">Game Forum</h1>
                        </div>
                    </div>
                </div>
                <div className="nk-header-text-bottom">
                    <div className="nk-breadcrumbs text-center">
                        <ul>
                            <li><a href="home">Home</a></li>
                            <li><span>Forum</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* <!-- END: Header Title --> */}
            <div className="nk-gap-4" />
            <div className="container">
                {/* <!-- START: Forums List --> */}
                <ul className="nk-forum">
                    { topics.map((topic: ForumTopicProps) => <ForumTopic { ...topic } />) }
                </ul>
                {/* <!-- END: Forums List --> */}
            </div>
            <div className="nk-gap-4" />
            <div className="nk-gap-4" />
        </>
    )
}