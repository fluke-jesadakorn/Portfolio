"use client";
import useSWR from "swr";

const fetcher = (url: string) => {
  // const url = "https://jsonplaceholder.typicode.com";
  return fetch(url).then((res) => res.json());
};
function Profile() {
  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>{JSON.stringify(data)}!</div>;
}

export default Profile;
