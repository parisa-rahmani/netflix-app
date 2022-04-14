import Link from 'next/link';
import React from 'react';
import Card from './card';
import styles from './section-card.module.css';

export default function SectionCard({
    title,
    size,
    data,
    shouldWrap = false,
    shouldScale,
}) {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div
                className={`${styles.cardWrapper} ${
                    shouldWrap && styles.wrapCards
                }`}
            >
                {data.map(item => {
                    return (
                        <Link href={`/video/${item.id}`} key={item.id}>
                            <a>
                                <Card
                                    imgUrl={item.imgUrl}
                                    size={size}
                                    shouldScale={shouldScale}
                                />
                            </a>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
