import { cn } from "@/lib/utils"

function Skeleton({
  className,
  children,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-3xl h-screen text-4xl bg-zinc-600/15", className)}
      {...props} >
        <h1 className="font-extrabold text-center p-2">{ children || "Loading...."}</h1>
      </div>)
  );
}

export { Skeleton }
