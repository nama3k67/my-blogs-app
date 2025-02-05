export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <div className="w-10 h-10 bg-primary rounded-full animate-bounce" />
      <div className="text-primary">Loading...</div>
    </div>
  );
}