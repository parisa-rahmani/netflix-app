import Image from 'next/image';
import React, { useState } from 'react';
import styles from './card.module.css';
import { motion } from 'framer-motion';

export default function Card({
    imgUrl = '/static/movie.jpeg',
    size = 'medium',
}) {
    const [imgSrc, setImgSrc] = useState(imgUrl);
    const classMap = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem,
    };

    const handleOnError = () => {
        setImgSrc('/static/movie.jpeg');
    };
    return (
        <div className={styles.container}>
            <motion.div
                whileHover={{ scale: 1.1 }}
                className={`${classMap[size]} ${styles.imgMotionWrapper} `}
            >
                <Image
                    src={imgSrc}
                    alt=""
                    layout="fill"
                    onError={handleOnError}
                    className={styles.cardImg}
                />
            </motion.div>
        </div>
    );
}
