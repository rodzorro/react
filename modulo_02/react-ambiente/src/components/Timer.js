import { useState } from "react";

export default function Timer(){
    const [value,setValue] = useState(0);
    return <span className="bg-red-200 p-3 m-4">{value}</span>;
}