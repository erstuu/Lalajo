const IMAGE_URL = "https://image.tmdb.org/t/p/";

export const getImageUrl = (path, key = "uri", width = "w500") => {
    return { [key]: `${IMAGE_URL}${width}${path}` };
};
