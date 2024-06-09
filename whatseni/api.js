const URL = 'https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev'
const IMG_URL = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public`

const fetchAPI = async (url) => {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (response) return response;
  } catch (e) {
    console.error(e);
  }
}

export const API = {
  fetchRootList: () => { return fetchAPI(URL) },
  fetchFolderList: (folderID) => { return fetchAPI(`${URL}/${folderID}`) },
  fetchFileImage: (filePath) => { return fetchAPI(`${IMG_URL}/${filePath}`) }
}