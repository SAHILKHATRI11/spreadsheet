export interface RowData {
  id: number;
  jobRequest: string;
  submitted: string;
  status?: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  dueDate: string;
  estValue: string;
}

export const mockData: RowData[] = [
  {
    id: 1,
    jobRequest: "Launch social media campaign for product",
    submitted: "05-12-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.alphaplanet.com",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    dueDate: "20-11-2024",
    estValue: "6,200.00 £",
  },
  {
    id: 2,
    jobRequest: "Update press kit for company redesign",
    submitted: "30-10-2024",
    status: "In-process",
    submitter: "Irfan Khan",
    url: "www.irfanheim.com",
    assigned: "Tejas Pandey",
    priority: "High",
    dueDate: "30-10-2024",
    estValue: "3,500.00 £",
  },
  {
    id: 3,
    jobRequest: "Finalize user testing feedback for app",
    submitted: "10-12-2024",
    status: "Complete",
    submitter: "Mark Johnson",
    url: "www.markjohnson.dev",
    assigned: "Rachel Lee",
    priority: "Medium",
    dueDate: "10-12-2024",
    estValue: "4,750.00 £",
  },
  {
    id: 4,
    jobRequest: "Design new features for the website",
    submitted: "15-01-2025",
    status: "",
    submitter: "Emily Green",
    url: "www.emilygreen.io",
    assigned: "Tom Wright",
    priority: "Low",
    dueDate: "15-01-2025",
    estValue: "5,900.00 £",
  },
  {
    id: 5,
    jobRequest: "Prepare financial report for Q4",
    submitted: "31-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabrown.co",
    assigned: "Kevin Smith",
    priority: "Medium",
    dueDate: "30-01-2025",
    estValue: "2,800.00 £",
  },
];
