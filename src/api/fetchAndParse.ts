import { fetcher } from "./fetcher";

interface IFetchAndParse<Params> {
  endpoint: string;
  params: Params;
}

export const fetchAndParse = async <Params, Result>({
  params,
  endpoint,
}: IFetchAndParse<Params>) => {
  const res = await fetcher.fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ ...params }),
  });

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const a = await res.json();
  if (!a.success) {
    throw new Error(a?.error?.message ?? JSON.stringify(a?.error ?? a));
  } else {
    return a.data as Result;
  }
};
