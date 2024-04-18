const Spinner = () => {
  return (
    <div className="flex animate-pulse space-x-4">
      <div className="flex-1 space-y-1 py-1">
        <div className="h-2 rounded bg-slate-400"></div>
        <div className="space-y-1">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-slate-500"></div>
            <div className="col-span-1 h-2 rounded bg-slate-500"></div>
          </div>
          <div className="h-2 rounded bg-slate-600"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
