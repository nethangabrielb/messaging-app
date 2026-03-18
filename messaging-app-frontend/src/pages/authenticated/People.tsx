import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import PeopleRow from "@/components/people/PeopleRow";
import { socket } from "../../socket";
import { SelectPeople } from "@/components/people/SelectFilterPeople";
import { PeoplRowSkeleton } from "@/components/people/PeopleRowSkeleton";

const People = () => {
  const [statusFilter, setStatusFilter] = useState<null | string>(null);
  const [search, setSearch] = useState<null | string>(null);

  // Upon mounting component, query all people
  const { data, refetch, isPending } = useQuery({
    queryKey: ["users", statusFilter, search],
    queryFn: async () => {
      const token = JSON.parse(localStorage.getItem("token") as string);
      let url = `${import.meta.env.VITE_SERVER_URL}/api/users`;
      if (statusFilter && search) {
        url = `${url}?filter=${statusFilter}&search=${search}`;
      } else if (statusFilter) {
        url = `${url}?filter=${statusFilter}`;
      } else if (search) {
        url = `${url}?search=${search}`;
      }
      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const users = await res.json();
      return users;
    },
  });

  useEffect(() => {
    const refetchUsers = (shouldRefetch: { refetch: boolean }) => {
      if (shouldRefetch.refetch) {
        refetch();
      }
    };
    socket.on("set status", refetchUsers);
  }, []);

  return (
    <main className="border-border bg-card row-start-2 flex h-full flex-col items-center gap-4 rounded-sm border p-2 lg:col-start-2 lg:col-end-3">
      <div className="mt-8 mb-4 flex w-full gap-2 sm:mt-5 sm:mb-10 sm:w-[50%]">
        <Input
          type="search"
          className="w-[80%] grow-1 placeholder:text-[12px] sm:w-[50%]"
          placeholder="Search someone..."
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
        <SelectPeople setStatusFilter={setStatusFilter}></SelectPeople>
      </div>

      {/* A list of users should be here */}
      {isPending ? (
        <PeoplRowSkeleton></PeoplRowSkeleton>
      ) : (
        data?.data.map((user: User) => {
          return <PeopleRow key={user.id} user={user}></PeopleRow>;
        })
      )}
    </main>
  );
};

export default People;
