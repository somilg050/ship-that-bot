const Spinner = () => {
    return (
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-1 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-1">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;