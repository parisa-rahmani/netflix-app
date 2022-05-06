import Link from 'next/link';
import React from 'react';
import Card from './card';
import styles from './section-card.module.css';
import { motion } from 'framer-motion';

export default function SectionCard({
    title,
    size,
    data,
    shouldWrap = false,
    withMotion = false,
    shouldScale,
}) {
    const fadeInUp = {
        initial: {
            y: 60,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };
    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <motion.div
                variants={stagger}
                initial="initial"
                animate={'animate'}
                exit={{ opacity: 0 }}
                className={`${styles.cardWrapper} ${
                    shouldWrap && styles.wrapCards
                }`}
            >
                {data.length > 0 ? (
                    data.map(item => {
                        return (
                            <motion.div
                                key={item.id}
                                variants={withMotion && fadeInUp}
                            >
                                <Link href={`/video/${item.id}`} key={item.id}>
                                    <a>
                                        <Card
                                            imgUrl={item.imgUrl}
                                            size={size}
                                            shouldScale={shouldScale}
                                        />
                                    </a>
                                </Link>
                            </motion.div>
                        );
                    })
                ) : title === 'Watch It Again' ? (
                    <div>your liked videos shown here.</div>
                ) : (
                    <div>data not found!, please try again later.</div>
                )}
            </motion.div>
        </section>
    );
}
