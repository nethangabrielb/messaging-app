import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {
  setStatusFilter: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SelectPeople = ({ setStatusFilter }: Props) => {
  return (
    <Select onValueChange={(value) => setStatusFilter(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="ONLINE">Online</SelectItem>
          <SelectItem value="OFFLINE">Offline</SelectItem>
          <SelectItem value="BUSY">Busy</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
