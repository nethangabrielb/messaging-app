const fetchData = async (url: string) => {
  const token = JSON.parse(localStorage.getItem("token") as string);
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export default fetchData;
