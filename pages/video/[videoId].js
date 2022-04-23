import React, { useState, useEffect } from 'react';
import styles from '../../styles/video.module.css';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar/navbar';
import { getVideoById } from '../../utils/getVideos';
import Like from '../../components/icons/like';
import DisLike from '../../components/icons/dislike';

export async function getStaticProps(context) {
    const videoArray = await getVideoById(context.params.videoId);

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        revalidate: 10, // In seconds
    };
}

export async function getStaticPaths() {
    const videos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];
    const paths = videos.map(videoId => ({
        params: { videoId },
    }));

    return { paths, fallback: 'blocking' };
}

export default function Video({ video }) {
    const [toggleLike, setToggleLike] = useState(false);
    const [toggleDisLike, setToggleDisLike] = useState(false);
    const router = useRouter();
    const {
        title,
        description,
        publishTime,
        channelTitle,
        statistics: viewCount,
    } = video;
    const videoId = router.query.videoId;

    useEffect(() => {
        const getVideo = async () => {
            const response = await fetch(`/api/stats?videoId=${videoId}`, {
                method: 'GET',
            });
            const result = await response.json();
            if (result?.data?.length > 0) {
                const favourited = result.data[0].favourited;
                if (favourited === 1) {
                    setToggleLike(true);
                } else {
                    setToggleDisLike(true);
                }
            }
        };
        getVideo();
    }, []);

    const runRatingService = async favourited => {
        try {
            const response = await fetch('/api/stats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    videoId,
                    favourited,
                }),
            });
            await response.json();
        } catch (error) {}
    };

    const handleToggleDislike = async () => {
        setToggleDisLike(!toggleDisLike);
        setToggleLike(toggleDisLike);

        const val = !toggleDisLike;
        const favourited = val ? 0 : 1;
        await runRatingService(favourited);
    };

    const handleToggleLike = async () => {
        const val = !toggleLike;
        setToggleLike(val);
        setToggleDisLike(toggleLike);

        const favourited = val ? 1 : 0;
        await runRatingService(favourited);
    };
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.modal}>
                <iframe
                    id="player"
                    type="text/html"
                    width="640"
                    height="390"
                    src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=0&origin=http://example.com`}
                    frameborder="0"
                    className={styles.videoPlayer}
                ></iframe>

                <div className={styles.likeDislikeBtnWrapper}>
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
                </div>
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
