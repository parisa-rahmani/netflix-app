import Head from 'next/head';
import SectionCard from '../../components/card/section-card';
import Navbar from '../../components/navbar/navbar';
import styles from '../../styles/mylist.module.css';
import { getMyListVideos } from '../../utils/getVideos';
import { verifyToken } from '../../utils/verifyToken';

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

    const videos = await getMyListVideos(token, userId);

    return {
        props: {
            videos,
        },
    };
}

export default function myList({ videos }) {
    return (
        <div>
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
                    />
                </div>
            </main>
        </div>
    );
}
