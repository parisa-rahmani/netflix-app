import Banner from '../components/Banner/banner';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import SectionCard from '../components/card/section-card';
import {
    getVideos,
    getPopularVideos,
    getWatchedItAgainVideos,
} from '../utils/getVideos';
import { verifyToken } from '../utils/verifyToken';

export async function getServerSideProps(context) {
    const token = context.req ? context.req.cookies.token : null;
    const userId = await verifyToken(token);
    if (!userId) {
        return {
            props: {},
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
    const disneyVideos = await getVideos('disney trailers');
    const travelVideos = await getVideos('travel');
    const productivityVideos = await getVideos('productivity');
    const popularVideos = await getPopularVideos();
    const watchedItAgain = await getWatchedItAgainVideos(token, userId);
    return {
        props: {
            disneyVideos,
            travelVideos,
            productivityVideos,
            popularVideos,
            watchedItAgain,
        },
    };
}

export default function Home({
    disneyVideos,
    travelVideos,
    productivityVideos,
    popularVideos,
    watchedItAgain,
}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>NETFLIX</title>
            </Head>
            <div className={styles.main}>
                <Navbar />
                <Banner
                    videoId="4zH5iYM4wJo"
                    title="Clifford the red dog"
                    subTitle="a very cute dog"
                    imgUrl={'/static/clifford.webp'}
                />
                <div className={styles.sectionWrapper}>
                    <SectionCard
                        title="Disney"
                        size={'large'}
                        data={disneyVideos}
                    />
                    <SectionCard
                        title="Watched It Again"
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
        </div>
    );
}
