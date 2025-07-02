function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-blue-700 font-semibold text-lg">⏳ Loading complaints...</p>
    </div>
  );
}

export default Loader;