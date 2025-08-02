interface NoProductStateProps {
  hint?: string;
}

export default function NoProductState({ hint }: NoProductStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-800">
      <p className="text-xl xl:text-2xl font-medium">No products found</p>
      <p className="text-md xl:text-xl text-gray-700">
        {hint ?? "Try selecting a different category or check back later."}
      </p>
    </div>
  );
}
