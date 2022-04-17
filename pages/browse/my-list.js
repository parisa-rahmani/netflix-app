import Head from 'next/head';
import SectionCard from '../../components/card/section-card';
import Navbar from '../../components/navbar/navbar';
import styles from '../../styles/mylist.module.css';
import { getMyListVideos } from '../../utils/getVideos';
import { verifyToken } from '../../utils/verifyToken';
import { motion } from 'framer-motion';

export async function getServerSideProps(context) {
    const token = context.req ? context.req.cookies?.token : null;
    const userId = await verifyToken(token);
    const videos = await getMyListVideos(token, userId);

    return {
        props: {
            videos,
        },
    };
}

export default function myList({ videos }) {
    return (
        <motion.div exit={{ opacity: 0 }}>
            <Head>
                <title>My List</title>
            </Head>
            <main className={styles.main}>
                <Navbar />
                <div className={styles.sectionWrapper}>
                    <SectionCard
                        shouldWrap
                        shouldScale={false}
                        size={'small'}
                        title="My List"
                        data={videos}
                        withMotion={true}
                    />
                </div>
            </main>
        </motion.div>
    );
}
