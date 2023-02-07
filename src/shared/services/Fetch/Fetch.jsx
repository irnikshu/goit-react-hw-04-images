import axios from 'axios';

const instance = axios.create({
  baseURL: `https://pixabay.com/api`,
  params: {
    q: '',
    page: 1,
    key: '31927984-d7f8c8a904e38a53072577433',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getSearchImages = async (q, page = 1) => {
  const { data } = await instance.get('/', { params: { q, page } });
  return data;
};
