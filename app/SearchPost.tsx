import { Categories } from "@/types";
import { Card, Input, Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

interface props {
  setSearch: Dispatch<SetStateAction<string>>;
}
export default function SearchPost({ setSearch }: props) {
  const categories: Categories[] = [
    { id: 0, value: "", name: "All" },
    { id: 1, value: "red", name: "Red" },
    { id: 2, value: "blue", name: "Blue" },
    { id: 3, value: "yellow", name: "Yellow" },
    { id: 4, value: "orange", name: "Orange" },
  ];

  return (
    <Card className="p-10">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="md:w-[30%]">
          <Select
            label="Select Category"
            onChange={(e) => setSearch(e.target.value)}
          >
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="md:w-[70%]">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            label="Search for post..."
          />
        </div>
      </div>
    </Card>
  );
}
