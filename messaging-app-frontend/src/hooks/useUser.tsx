import { useQuery } from "@tanstack/react-query";
import fetchData from "@/lib/fetchData";

const useUser = () => {
  const token = JSON.parse(localStorage.getItem("token") as string);
  const { data: user, refetch: refetchUser } = useQuery({
    queryKey: [token],
    queryFn: async () => {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/api/users?tokenHolder=true`;
      return fetchData(url);
    },
  });

  return { user, refetchUser };
};

export default useUser;
