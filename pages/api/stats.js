import jwt from 'jsonwebtoken';
import {
    findVideoById,
    insertVideoStats,
    updateVideoStats,
} from '../../utils/hasura';

export default async function stats(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(403).send({});
        } else {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken?.issuer;
            const { videoId } = req.method === 'POST' ? req.body : req.query;
            if (videoId) {
                const findVideo = await findVideoById(token, userId, videoId);
                const isStatsExist = findVideo.length > 0;

                if (req.method === 'POST') {
                    const { favourited, watched = true } = req.body;
                    if (isStatsExist) {
                        const response = await updateVideoStats(token, {
                            favourited,
                            watched,
                            userId,
                            videoId,
                        });
                        res.send({ success: true, data: response });
                    } else {
                        const response = await insertVideoStats(token, {
                            favourited,
                            watched,
                            userId,
                            videoId,
                        });
                        res.send({ success: true, data: response });
                    }
                } else {
                    if (isStatsExist) {
                        res.send({ success: true, data: findVideo });
                    } else {
                        res.status(404).send({
                            success: false,
                            msg: 'video not found',
                        });
                    }
                }
            } else {
                res.status(500).send({
                    success: false,
                    msg: 'videoId required',
                });
            }
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            msg: 'somthing went wrong',
            error: error?.message,
        });
    }
}
