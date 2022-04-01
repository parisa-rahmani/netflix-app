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
            return {
                id,
                title: item.snippet.title,
                imgUrl: item.snippet.thumbnails.high.url,
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
