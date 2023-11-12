import useSWR from "swr";
import { fetcher } from "@/actions/index";
// import axios from 'axios';
export const useSubmit = () => {
  const url  ="/";  
  const { data, error, ...rest } = useSWR(url, fetcher);
  console.log(data ,error , "error" )
  return { data, error, loading: !data && !error, ...rest };
};

