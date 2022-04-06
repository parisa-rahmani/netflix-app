import React from 'react';
import styles from '../../styles/video.module.css';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar/navbar';

export async function getStaticProps() {
    const video = {
        title: 'hi',
        publishTime: '11111',
        description: 'ohhhhhghfjdkhslhdlk',
        channelTitle: 'ieurwiroe',
        viewCount: '9000',
    };

    return {
        props: {
            video,
        },
        revalidate: 10, // In seconds
    };
}

export async function getStaticPaths() {
    const videos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];
    const paths = videos.map(videoId => ({
        params: { videoId },
    }));

    return { paths, fallback: true };
}

export default function Video({ video }) {
    const router = useRouter();
    const { title, description, viewCount, publishTime, channelTitle } = video;
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.modal}>
                <iframe
                    id="player"
                    type="text/html"
                    width="640"
                    height="390"
                    src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&controls=0&origin=http://example.com`}
                    frameborder="0"
                    className={styles.videoPlayer}
                ></iframe>

                {/* <div className={styles.likeDislikeBtnWrapper}>
                <div className={styles.likeBtnWrapper}>
                    <button onClick={handleToggleLike}>
                        <div className={styles.btnWrapper}>
                            <Like selected={toggleLike} />
                        </div>
                    </button>
                </div>
                <button onClick={handleToggleDislike}>
                    <div className={styles.btnWrapper}>
                        <DisLike selected={toggleDisLike} />
                    </div>
                </button>
            </div> */}
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{publishTime}</p>
                            <p className={styles.title}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={styles.subTextWrapper}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>
                                    {channelTitle}
                                </span>
                            </p>
                            <p className={styles.subTextWrapper}>
                                <span className={styles.textColor}>
                                    View Count:{' '}
                                </span>
                                <span className={styles.channelTitle}>
                                    {viewCount}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
