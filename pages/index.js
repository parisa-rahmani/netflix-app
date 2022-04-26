import Banner from '../components/Banner/banner';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import SectionCard from '../components/card/section-card';
import {
    getVideos,
    getPopularVideos,
    getWatchedItAgainVideos,
    getVideoById,
} from '../utils/getVideos';
import { verifyToken } from '../utils/verifyToken';
import { motion } from 'framer-motion';

export async function getServerSideProps(context) {
    const token = context.req ? context.req.cookies?.token : null;
    const userId = await verifyToken(token);
    const disneyVideos = await getVideos('disney trailers');
    const travelVideos = await getVideos('travel');
    const productivityVideos = await getVideos('productivity');
    const popularVideos = await getPopularVideos();
    const watchedItAgain = await getWatchedItAgainVideos(token, userId);
    const loopedVideos = ['mYfJxlgR2jw', '4zH5iYM4wJo', 'KCPEHsAViiQ'];
    const getRandomVideo = () => {
        const idx = Math.floor(Math.random() * (2 - 0 + 1) + 0);
        return loopedVideos[idx];
    };
    const bannerId = getRandomVideo();
    const bannerVideo = await getVideoById(bannerId);

    return {
        props: {
            disneyVideos,
            travelVideos,
            productivityVideos,
            popularVideos,
            watchedItAgain,
            bannerVideo,
        },
    };
}

export default function Home({
    disneyVideos,
    travelVideos,
    productivityVideos,
    popularVideos,
    watchedItAgain = [],
    bannerVideo,
}) {
    const {
        title = 'Clifford the red dog',
        id = '4zH5iYM4wJo',
        imgUrl = '/static/clifford.webp',
    } = bannerVideo.length > 0 && bannerVideo[0];
    return (
        <motion.div exit={{ opacity: 0 }} className={styles.container}>
            <Head>
                <title>NETFLIX</title>
            </Head>
            <div className={styles.main}>
                <Navbar />
                {/* <Banner
                    videoId="4zH5iYM4wJo"
                    title="Clifford the red dog"
                    subTitle="a very cute dog"
                    imgUrl={'/static/clifford.webp'}
                /> */}
                <Banner videoId={id} title={title} imgUrl={imgUrl} />
                <div className={styles.sectionWrapper}>
                    <SectionCard
                        title="Disney"
                        size={'large'}
                        data={disneyVideos}
                    />
                    <SectionCard
                        title="Watch It Again"
                        size={'small'}
                        data={watchedItAgain}
                    />
                    <SectionCard
                        title="Travel"
                        size={'small'}
                        data={travelVideos}
                    />{' '}
                    <SectionCard
                        title="Productivity"
                        size={'medium'}
                        data={productivityVideos}
                    />
                    <SectionCard
                        title="Most Popular"
                        size={'small'}
                        data={popularVideos}
                    />
                </div>
            </div>
        </motion.div>
    );
}
