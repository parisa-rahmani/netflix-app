import { getFvouritedVideos, getWatchedVideos } from './hasura';

export const getCommonVideos = async url => {
    try {
        const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';
        const response = await fetch(
            `${BASE_URL}/${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`
        );
        const data = await response.json();
        if (data.error) {
            console.log(
                '🚀 ~ file: getVideos.js ~ line 8 ~ data.error',
                data.error
            );

            return [];
        }
        return data?.items.map(item => {
            const id = item?.id?.videoId || item.id;
            const snippet = item.snippet;
            return {
                id,
                title: snippet.title,
                imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
                description: snippet.description,
                publishTime: snippet.publishedAt,
                channelTitle: snippet.channelTitle,
                statistics: item.statistics
                    ? item.statistics.viewCount
                    : { viewCount: 0 },
            };
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getVideos = searchQuery => {
    const URL = `search?part=snippet&q=${searchQuery}`;
    return getCommonVideos(URL);
};

export const getPopularVideos = () => {
    const URL = `videos?part=snippet%2CcontentDetails&chart=mostPopular&regionCode=US`;
    return getCommonVideos(URL);
};

export const getVideoById = videoId => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    return getCommonVideos(URL);
};

export const getWatchedItAgainVideos = async (token, userId) => {
    const videos = await getWatchedVideos(token, userId);
    return videos?.map(video => {
        return {
            id: video.videoId,
            imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
        };
    });
};
export const getMyListVideos = async (token, userId) => {
    const videos = await getFvouritedVideos(token, userId);
    return videos?.map(video => {
        return {
            id: video.videoId,
            imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
        };
    });
};
