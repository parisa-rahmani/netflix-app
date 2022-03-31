import Banner from '../components/Banner/banner';
import Navbar from '../components/navbar/navbar';
import styles from '../styles/Home.module.css';
import Head from 'next/head';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>NETFLIX</title>
            </Head>
            <Navbar username={'parisa.rahmani'} />
            <Banner
                title={'my favourite movie'}
                subTitle={'interested'}
                imgUrl={'static/clifford.webp'}
            />
            {/* card */}
        </div>
    );
}
