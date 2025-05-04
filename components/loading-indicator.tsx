export function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative w-10 h-10">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#31029c] border-opacity-20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#31029c] rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
