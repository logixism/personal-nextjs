export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-sm sm:w-lg h-130 overflow-scroll p-1">
      {children}
    </div>
  );
}
