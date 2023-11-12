import useSWR from "swr";
import { fetcher } from "@/actions/index";
export const useCreateTable = () => {
  const url  ="/create_table";  
  const { data, error, ...rest } = useSWR(url, fetcher);
  return { data, error, loading: !data && !error, ...rest };
};
