const URL = 'https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev'

const fetchAPI = async (url) => {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (response) return response.json();
  } catch (e) {
    window.alert('api error!');
  }
}

export const API = {
  fetchRootList: () => { return fetchAPI(URL) },
  fetchFolderList: (folderID) => { return fetchAPI(`${URL}/${folderID}`) },
}