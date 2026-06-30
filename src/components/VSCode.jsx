const VSCode = () => {
  return (
    <div className="border h-full rounded-md">
      <div className="header border-b p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-[13px] h-[13px] bg-red-400 rounded-full"></div>
          <div className="w-[13px] h-[13px] bg-yellow-400 rounded-full"></div>
          <div className="w-[13px] h-[13px] bg-green-400 rounded-full"></div>
        </div>

        <div className="flex-grow text-center">
          VS Code
        </div>

      </div>
      <div className="grid grid-cols-[300px_1fr] h-[calc(100%-40px)]">
        <div className="sidebar border-r">
          Sidebar
        </div>
        <div className="main-content">Main Content</div>
      </div>
    </div>
  )
}

export default VSCode