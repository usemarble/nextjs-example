"use client";

import { useState } from "react";
import { Input } from "./ui/input";

function Filters() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const handleSearch = () => {
  //   console.log('....');
  // };

  return (
    <div className="flex justify-between">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div></div>
    </div>
  );
}

export default Filters;
