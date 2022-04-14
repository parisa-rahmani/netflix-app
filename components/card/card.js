import Image from 'next/image';
import React, { useState } from 'react';
import styles from './card.module.css';
import { motion } from 'framer-motion';

export default function Card({
    imgUrl = '/static/movie.jpeg',
    size = 'medium',
    shouldScale = true,
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
    const shouldHover = shouldScale && { whileHover: { scale: 1.1 } };
    return (
        <div className={styles.container}>
            <motion.div
                {...shouldHover}
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
