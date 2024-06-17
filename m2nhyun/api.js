const API_ENDPOINT =
  "https://l9817xtkq3.execute-api.ap-northeast-2.amazonaws.com/dev";
// const IMAGE_BASE_URL =
//   "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public";

const cache = {};

export async function fetchNodes(nodeId = "") {
  if (cache[nodeId]) {
    return cache[nodeId];
  }

  try {
    const response = await fetch(`${API_ENDPOINT}/${nodeId}`);
    if (!response.ok) {
      throw new Error("데이터 못불러옴.");
    }
    const data = await response.json();
    cache[nodeId] = data;
    return data;
  } catch (error) {
    throw new Error("데이터를 불러오는 중 오류 발생.");
  }
}
