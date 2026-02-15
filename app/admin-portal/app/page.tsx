import Link from "next/link";
import { Button } from "./components/shadcn/ui/button";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      Not sure what goes here yet. (maybe nothing)
      <Link href={"/authenticate"}><Button>Login</Button></Link>
    </div>
  );
}
