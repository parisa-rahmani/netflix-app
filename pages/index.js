import Banner from '../components/Banner/banner';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import SectionCard from '../components/card/section-card';
import { getVideos, getPopularVideos } from '../utils/getVideos';

export async function getServerSideProps() {
    const disneyVideos = await getVideos('disney trailers');
    const travelVideos = await getVideos('travel');
    const productivityVideos = await getVideos('productivity');
    const popularVideos = await getPopularVideos();
    return {
        props: {
            disneyVideos,
            travelVideos,
            productivityVideos,
            popularVideos,
        },
    };
}

export default function Home({
    disneyVideos,
    travelVideos,
    productivityVideos,
    popularVideos,
}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>NETFLIX</title>
            </Head>
            <div className={styles.main}>
                <Navbar username={'parisa.rahmani'} />
                <Banner
                    title={'my favourite movie'}
                    subTitle={'interested'}
                    imgUrl={'/static/clifford.webp'}
                />
                <div className={styles.sectionWrapper}>
                    <SectionCard
                        title="Disney"
                        size={'large'}
                        data={disneyVideos}
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
