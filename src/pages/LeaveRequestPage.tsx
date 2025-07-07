import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// =================================================================
// START: Hardcoded Icons & UI Components (Self-contained)
// =================================================================
const Icon = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);
const CheckCircle = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </Icon>
);
const Clock = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);
const XCircle = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </Icon>
);
const FileUp = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M21.2 4H2.8A2.8 2.8 0 0 0 0 6.8v10.4A2.8 2.8 0 0 0 2.8 20h18.4a2.8 2.8 0 0 0 2.8-2.8V6.8A2.8 2.8 0 0 0 21.2 4Z" />
    <polyline points="12 12 8 8 12 4 16 8 12 12" />
    <path d="M12 12v9" />
  </Icon>
);
const CalendarDays = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </Icon>
);

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm",
      className
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-slate-200 bg-white text-slate-900 shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// --- Types and Dummy Data ---
type LeaveStatus = "Pending" | "Approved" | "Rejected";
interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
}
const pastRequests: LeaveRequest[] = [
  {
    id: "LR-001",
    type: "Earned Leave",
    startDate: "2024-04-10",
    endDate: "2024-04-12",
    status: "Approved",
  },
  {
    id: "LR-002",
    type: "Sick Leave",
    startDate: "2024-05-20",
    endDate: "2024-05-21",
    status: "Approved",
  },
  {
    id: "LR-003",
    type: "Casual Leave",
    startDate: "2024-06-01",
    endDate: "2024-06-01",
    status: "Rejected",
  },
];
const getStatusClasses = (status: LeaveStatus) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    case "Pending":
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

// --- Main Page Component ---
const LeaveRequestPage = () => {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState("Casual Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Please select a start and end date.");
      return;
    }
    setSubmissionStatus("submitting");

    // Simulate API call
    console.log("Submitting Leave Request:", {
      leaveType,
      startDate,
      endDate,
      reason,
      attachmentName: attachment?.name,
    });
    setTimeout(() => {
      setSubmissionStatus("success");
    }, 2000);
  };

  const resetForm = () => {
    setLeaveType("Casual Leave");
    setStartDate("");
    setEndDate("");
    setReason("");
    setAttachment(null);
    setSubmissionStatus("idle");
  };

  if (submissionStatus === "success") {
    return (
      <div className="flex h-full items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-md text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Request Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Your leave request has been sent to the DM/SDM office for approval.
            You will be notified of any updates.
          </p>
          <Button onClick={resetForm} className="w-full">
            Submit Another Request
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-50 overflow-y-auto p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Leave Application
          </h1>
          <p className="text-gray-600 mt-1">
            Submit your leave request to the administrative office.
          </p>
        </header>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="leaveType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Leave Type
                </label>
                <Select
                  id="leaveType"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option>Casual Leave</option>
                  <option>Sick Leave</option>
                  <option>Earned Leave</option>
                  <option>Maternity/Paternity Leave</option>
                  <option>Leave without Pay</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  End Date
                </label>
                <Input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reason"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reason for Leave
              </label>
              <Textarea
                id="reason"
                rows={4}
                placeholder="Please provide a brief reason for your leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attach Document (Optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={(e) =>
                          setAttachment(
                            e.target.files ? e.target.files[0] : null
                          )
                        }
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  {attachment ? (
                    <p className="text-sm text-green-600 font-semibold pt-2">
                      {attachment.name}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">
                      PDF, PNG, JPG up to 5MB
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submissionStatus === "submitting"}
              >
                {submissionStatus === "submitting" ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
          </form>
        </Card>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Past Leave Requests
          </h2>
          <Card className="overflow-hidden">
            <div className="space-y-0">
              {pastRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50"
                >
                  <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 text-gray-400 mr-4" />
                    <div>
                      <p className="font-semibold text-gray-800">{req.type}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(req.startDate).toLocaleDateString()} -{" "}
                        {new Date(req.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded-full ${getStatusClasses(
                      req.status
                    )}`}
                  >
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default LeaveRequestPage;
