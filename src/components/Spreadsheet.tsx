import { mockData } from "../data/mockData";

function Spreadsheet() {
  const handleClick = (label: string) => {
    console.log(`${label} clicked`);
  };

  return (
    <div className="p-4 font-sans bg-white">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => handleClick("Tool bar")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            Tool bar ▶
          </button>
          <button
            onClick={() => handleClick("Hide fields")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            Hide fields
          </button>
          <button
            onClick={() => handleClick("Sort")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            Sort
          </button>
          <button
            onClick={() => handleClick("Filter")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            Filter
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleClick("Import")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            Import
          </button>
          <button
            onClick={() => handleClick("Export")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            Export
          </button>
          <button
            onClick={() => handleClick("Share")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            Share
          </button>
          <button
            onClick={() => handleClick("New Action")}
            className="text-sm px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            New Action
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4 text-sm">
        {["All Orders", "Pending", "Reviewed", "Arrived"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleClick(`${tab} tab`)}
            className="px-3 py-1 border-b-2 border-transparent hover:border-gray-400"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(mockData[0]).map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 border-b border-gray-300 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {Object.entries(row).map(([, cell], j) => (
                  <td key={j} className="px-4 py-2 border-b border-gray-200">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Spreadsheet;
