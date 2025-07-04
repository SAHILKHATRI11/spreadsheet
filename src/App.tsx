import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";

import {
  Search,
  Plus,
  FileText,
  Share,
  Import,
  Download,
  Eye,
  EyeOff,
  ArrowUpDown,
  Filter,
  Calendar,
  DollarSign,
  User,
  Link,
  AlertCircle,
} from "lucide-react";

type SpreadsheetRow = {
  id: number;
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  estValue: string;
};

type SortConfig = {
  key: keyof SpreadsheetRow | null;
  direction: "asc" | "desc";
};

const Spreadsheet = () => {
  const [activeTab, setActiveTab] = useState<string>("All Orders");
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hideFields, setHideFields] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  // Sample data matching the Figma design
  const [spreadsheetData, setSpreadsheetData] = useState([
    {
      id: 1,
      jobRequest: "Launch social media campaign for product",
      submitted: "08-12-2024",
      status: "To start",
      submitter: "Asha Patel",
      url: "www.ashapatel.com",
      assigned: "Sophie Choudhury",
      priority: "Medium",
      dueDate: "15-12-2024",
      estValue: "$200,000",
    },
    {
      id: 2,
      jobRequest: "Update press kit for company redesign",
      submitted: "10-12-2024",
      status: "In progress",
      submitter: "Irfan Khan",
      url: "www.irfankhan.com",
      assigned: "Yash Pandey",
      priority: "High",
      dueDate: "30-10-2024",
      estValue: "$500,000",
    },
    {
      id: 3,
      jobRequest: "Finalize user testing feedback for app",
      submitted: "08-12-2024",
      status: "In progress",
      submitter: "Mark Johnson",
      url: "www.markjohnson.com",
      assigned: "Rachel Lee",
      priority: "Medium",
      dueDate: "10-12-2024",
      estValue: "$750,000",
    },
    {
      id: 4,
      jobRequest: "Design new features for the website",
      submitted: "01-07-2024",
      status: "Complete",
      submitter: "Emily Green",
      url: "www.emilygreen.com",
      assigned: "Tom Wright",
      priority: "Low",
      dueDate: "15-01-2025",
      estValue: "$400,000",
    },
    {
      id: 5,
      jobRequest: "Prepare financial report for Q4",
      submitted: "25-01-2024",
      status: "Blocked",
      submitter: "Jessica Brown",
      url: "www.jessicabrown.com",
      assigned: "Kevin Smith",
      priority: "High",
      dueDate: "30-01-2025",
      estValue: "$800,000",
    },
  ]);

  const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

  const columns: {
    key: keyof SpreadsheetRow;
    label: string;
    icon: LucideIcon;
  }[] = [
    { key: "jobRequest", label: "Job Request", icon: FileText },
    { key: "submitted", label: "Submitted", icon: Calendar },
    { key: "status", label: "Status", icon: AlertCircle },
    { key: "submitter", label: "Submitter", icon: User },
    { key: "url", label: "URL", icon: Link },
    { key: "assigned", label: "Assigned", icon: User },
    { key: "priority", label: "Priority", icon: AlertCircle },
    { key: "dueDate", label: "Due Date", icon: Calendar },
    { key: "estValue", label: "Est. Value", icon: DollarSign },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "to start":
        return "bg-blue-100 text-blue-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "complete":
        return "bg-green-100 text-green-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCellClick = (rowId: number, colKey: string) => {
    const cellId = `${rowId}-${colKey}`;
    setSelectedCells((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cellId)) {
        newSet.delete(cellId);
      } else {
        newSet.add(cellId);
      }
      return newSet;
    });
    console.log(`Cell clicked: Row ${rowId}, Column ${colKey}`);
  };

  const handleSort = (key: keyof (typeof spreadsheetData)[0]) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...spreadsheetData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSpreadsheetData(sortedData);
    console.log(`Sorted by ${key} in ${direction} order`);
  };

  const handleFilter = () => {
    console.log("Filter button clicked");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log(`Search term: ${e.target.value}`);
  };

  const handleNewAction = () => {
    console.log("New Action button clicked");
  };

  const handleImport = () => {
    console.log("Import button clicked");
  };

  const handleExport = () => {
    console.log("Export button clicked");
  };

  const handleShare = () => {
    console.log("Share button clicked");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(`Tab changed to: ${tab}`);
  };

  const toggleHideFields = () => {
    setHideFields(!hideFields);
    console.log(`Hide fields: ${!hideFields}`);
  };

  const filteredData = spreadsheetData.filter((row: SpreadsheetRow) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Q3 Financial Overview
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">55%</span>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                A
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                B
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                C
              </div>
            </div>
            <button
              onClick={handleShare}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Share
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search within sheet"
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={toggleHideFields}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center space-x-1"
            >
              {hideFields ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              <span>Hide fields</span>
            </button>
            <button
              onClick={() => handleSort("id")}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center space-x-1"
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort</span>
            </button>
            <button
              onClick={handleFilter}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center space-x-1"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleImport}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center space-x-1"
            >
              <Import className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={handleShare}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors flex items-center space-x-1"
            >
              <Share className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={handleNewAction}
              className="px-3 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>New Action</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => console.log("Add new tab")}
          className="px-2 py-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Spreadsheet */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  onChange={(e) => console.log("Select all:", e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <column.icon className="w-4 h-4" />
                    <span>{column.label}</span>
                    {sortConfig.key === column.key && (
                      <ArrowUpDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      console.log(`Row ${row.id} selected:`, e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.key}`}
                    className={`px-6 py-4 whitespace-nowrap text-sm cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedCells.has(`${row.id}-${column.key}`)
                        ? "bg-blue-100"
                        : ""
                    }`}
                    onClick={() => handleCellClick(row.id, column.key)}
                  >
                    {column.key === "status" ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          row[column.key]
                        )}`}
                      >
                        {row[column.key]}
                      </span>
                    ) : column.key === "priority" ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          row[column.key]
                        )}`}
                      >
                        {row[column.key]}
                      </span>
                    ) : column.key === "url" ? (
                      <a
                        href={`https://${row[column.key]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {row[column.key]}
                      </a>
                    ) : (
                      <span className="text-gray-900">
                        {row[column.key as keyof SpreadsheetRow]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Showing {filteredData.length} of {spreadsheetData.length} entries
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Folder path */}
      <div className="text-gray-600 text-sm mb-2">
        Workspace / Folder 2 /{" "}
        <span className="font-semibold">Spreadsheet 3</span>
      </div>
      {/* Spreadsheet component */}
      <Spreadsheet />
    </div>
  );
}

export default App;
