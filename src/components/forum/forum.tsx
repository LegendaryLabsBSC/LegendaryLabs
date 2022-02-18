import React, { useEffect, useState } from 'react'
import { ForumTopic, ForumTopicBaseProps, ForumThread, ForumThreadBaseProps, ForumPost, ForumPostBaseProps } from './components'
import axios from 'axios'

export const Forum: React.FC = () => {
    const [topics, setTopics] = useState<ForumTopicBaseProps[]>([])
    const [threads, setThreads] = useState<ForumThreadBaseProps[]>([])
    const [posts, setPosts] = useState<ForumPostBaseProps[]>([])
    
    useEffect(() => {
        const getTopics = async () => {
            const res = await axios.get('http://localhost:3001/api/topics')
            const topics = res.data
            setTopics(topics)
        }
        getTopics()
        const getThreads = async () => {
            const res = await axios.get('http://localhost:3001/api/threads')
            const threads = res.data
            setThreads(threads)
        }
        getThreads()
        const getPosts = async () => {
            const res = await axios.get('http://localhost:3001/api/posts')
            const posts = res.data
            setPosts(posts)
        }
        getPosts()
    }, [])

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