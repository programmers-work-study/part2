/*
  TODO 캐시 기능 url을 통해서 캐시스토리지에 저장하
  key: url 
  value:data

  만료 기능이 필요할지도? 
  아니면 fetch 기능과 분리?
  cacheStorage

  */

const storage = sessionStorage;
export async function fetchData({url, setLoading, setData}) {
  setLoading(true);
  try {
    const cached = storage.getItem(url);
    const data = cached
      ? JSON.parse(cached)
      : await fetch(url).then(async (res) => {
          if (!res.ok) throw Error("연결 실패");
          const returnData = await res.json();
          const stringified = JSON.stringify(returnData);
          storage.setItem(url, stringified);
          return returnData;
        });
    setData(data);
  } catch (error) {
    alert("연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
  } finally {
    setLoading(false);
  }
}
