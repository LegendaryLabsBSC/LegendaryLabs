import React, { useEffect, useState } from 'react'
import { ForumTopic, ForumTopicBaseProps, ForumThread, ForumThreadBaseProps, ForumPost, ForumPostBaseProps } from './components'
import { Storage } from 'aws-amplify'

export const Forum: React.FC = () => {
    useEffect(() => {
        const getposts = async () => {
            const res = await Storage.get('posts.json', { level: 'private', download: true })
            const posts = await res.Body
            console.log(posts)
        }
        getposts()
    }, [])

    const topics: ForumTopicBaseProps[] = [
        {
            id: '1',
            title: 'Main Game Discussions',
            subtitle: 'Be seed is air female greater was multiply saying great',
            numberThreads: 1267,
            previewTitle: 'GodLike the only game that I want to play!',
            previewDate: 'September 11, 2017'
        },
        {
            id: '2',
            title: 'Other Discussions',
            subtitle: 'Sick additional subtitle',
            numberThreads: 1269,
            previewTitle: 'GodLike the only game that I want to play!',
            previewDate: 'September 11, 2017'
        }
    ]
    
    const threads: ForumThreadBaseProps[] = [
        {
            id: '1',
            topic: '1',
            title: 'First Thread',
            subtitle: 'Be seed is air female greater was multiply saying great',
            numberThreads: 1267,
            previewTitle: 'GodLike the only game that I want to play!',
            previewDate: 'September 11, 2017'
        },
        {
            id: '2',
            topic: '1',
            title: 'Another Thread',
            subtitle: 'Sick additional subtitle',
            numberThreads: 1269,
            previewTitle: 'GodLike the only game that I want to play!',
            previewDate: 'September 11, 2017'
        },
        {
            id: '3',
            topic: '2',
            title: 'First Topic 2 Thread',
            subtitle: 'Be seed is air female greater was multiply saying great',
            numberThreads: 1267,
            previewTitle: 'Legendary Thread!',
            previewDate: 'September 11, 2017'
        },
        {
            id: '4',
            topic: '2',
            title: 'Another Thread',
            subtitle: 'Sick additional subtitle',
            numberThreads: 1275,
            previewTitle: 'GodLike the only game that I want to play!',
            previewDate: 'September 12, 2017'
        }
    ]

    const posts: ForumPostBaseProps[] = [
        {
            id: '1',
            topic: '1',
            thread: '1',
            user: 'Derp',
            role: 'Member',
            header: 'Something about my post',
            post: 'derp',
            date: 'July 4, 1921',
        },
        {
            id: '2',
            topic: '1',
            thread: '1',
            user: 'nftWeirdo1',
            role: 'Member',
            header: 'Something about my post',
            post: 'string',
            date: 'June 11, 1997',
        },
        {
            id: '3',
            topic: '2',
            thread: '1',
            user: 'string',
            role: 'Member',
            header: 'Something about my post',
            post: 'string',
            date: 'January 26, 2014',
        },
        {
            id: '4',
            topic: '2',
            thread: '2',
            user: 'string',
            role: 'Admin',
            header: 'Something about my post',
            post: 'string',
            date: 'August 26, 2021',
        },
        {
            id: '5',
            topic: '1',
            thread: '2',
            user: 'string',
            role: 'Member',
            header: 'Something about my post',
            post: 'string',
            date: 'May 8, 2012',
        },
        {
            id: '6',
            topic: '1',
            thread: '3',
            user: 'Randy',
            role: 'Admin',
            header: 'Something about my post',
            post: 'string',
            date: 'April 1, 1969',
        },
        {
            id: '7',
            topic: '2',
            thread: '3',
            user: 'Poster Long',
            role: 'Member',
            header: 'Something about this pretty long post',
            post: `a really really really really really really really really really really really really really really really 
                really really really really really really really really really really really really really really really really 
                really really really really really really really really really really really really really really really really 
                really really really really really really really really really really really really really really really really 
                really really really really really really really really really really really really really really really really 
                really really long post`,
            date: 'May 10, 2020',
        },
        {
            id: '8',
            topic: '2',
            thread: '4',
            user: 'string',
            role: 'Member',
            header: 'Something about my post',
            post: 'the quick brown fox jumped over the lazy dog',
            date: 'June 6, 2006',
        }
    ]

    const [topic, setTopic] = useState<string>()
    const [thread, setThread] = useState<string>()

    const backToForum = (): void => {
        setTopic('')
        setThread('')
    }

    return (
        <>
            <div className="nk-header-title nk-header-title-sm nk-header-title-parallax nk-header-title-parallax-opacity">
                <div className="bg-image">
                    <img src="assets/images/blue_logo_no_words.png" alt="" className="jarallax-img" style={{ width: '650px', transform: 'scaleX(-1)', left: 'auto' }}/>
                </div>
                <div className="nk-header-table">
                    <div className="nk-header-table-cell">
                        <div className="container">
                            <h1 className="nk-title">Legendary Forum</h1>
                        </div>
                    </div>
                </div>
                <div className="nk-header-text-bottom">
                    <div className="nk-breadcrumbs text-center">
                        <ul>
                            <li><a href="home">Home</a></li>
                            <li><a onClick={() => backToForum()}>Forum</a></li>
                            {!!topic && <li><a onClick={() => setThread('')}>{topics.find((x) => x.id === topic)?.title}</a></li>}
                            {!!topic && !!thread && <li><a>{threads.find((x) => x.id === topic)?.title}</a></li>}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <!-- END: Header Title --> */}
            <div className="nk-gap-4" />
            <div className="container">
                {/* <!-- START: Forums List --> */}
                <ul className="nk-forum">
                    { !topic && topics.map((topic: ForumTopicBaseProps) => <ForumTopic { ...topic } setTopic={setTopic} />) }
                    { !!topic && !thread && threads.filter((x) => x.topic === topic).map((topic: ForumThreadBaseProps) => <ForumThread { ...topic } setThread={setThread} />) }
                    { !!topic && !!thread && (
                            <ul className='nk-forum-topic'>
                               { posts.filter((x) => x.thread === thread).map((topic: ForumPostBaseProps) => <ForumPost { ...topic } />) }
                            </ul>
                        )
                    }
                </ul>
                {/* <!-- END: Forums List --> */}
            </div>
            <div className="nk-gap-4" />
            <div className="nk-gap-4" />
        </>
    )
}