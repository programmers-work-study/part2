export async function fetchData({url, setLoading, setData}) {
  setLoading(true);
  try {
    const data = await fetch(url).then((res) => {
      if (!res.ok) throw Error("연결 실패");
      return res.json();
    });
    setData(data);
  } catch (error) {
    alert("연결에 실패했습니다. 잠시 후 다시 시도해주세요.");
  } finally {
    setLoading(false);
  }
}
