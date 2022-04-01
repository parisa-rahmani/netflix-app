import React from 'react';
import Card from './card';
import styles from './section-card.module.css';

export default function SectionCard({ title, size, data }) {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.cardWrapper}>
                {data.map(item => {
                    return (
                        <Card key={item.id} imgUrl={item.imgUrl} size={size} />
                    );
                })}
            </div>
        </section>
    );
}
