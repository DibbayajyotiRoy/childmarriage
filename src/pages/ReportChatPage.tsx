import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

// =================================================================
// START: Hardcoded Icons & UI Components (Unchanged)
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
const ArrowLeft = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </Icon>
);
const Send = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </Icon>
);
const FileText = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </Icon>
);
const Upload = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" x2="12" y1="3" y2="15" />
  </Icon>
);
const X = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
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
const AlertCircle = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </Icon>
);

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  size?: "default" | "sm";
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variant === "default" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "ghost" && "hover:bg-slate-100 hover:text-slate-900",
        size === "default" && "h-10 py-2 px-4",
        size === "sm" && "h-9 px-3 rounded-md",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

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

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}
const Badge = ({ className, variant = "default", ...props }: BadgeProps) => (
  <div
    className={cn(
      "inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors",
      variant === "default" && "border-transparent bg-slate-900 text-slate-50",
      variant === "outline" && "text-slate-900",
      className
    )}
    {...props}
  />
);
Badge.displayName = "Badge";

const ScrollArea = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative overflow-y-auto", className)}
    {...props}
  >
    {children}
  </div>
));
ScrollArea.displayName = "ScrollArea";

// --- Data and Interfaces (Unchanged) ---
const dummyCases = [
  {
    id: "case-004",
    reporterName: "Anjali Debbarma (NGO Worker)",
    location: {
      village: "Agartala",
      district: "West Tripura",
      state: "Tripura",
    },
    issueDate: "2023-11-05T18:00:00Z",
    details:
      "A report from an NGO worker states that a 16-year-old girl from a financially struggling family on the outskirts of Agartala is being prepared for marriage...",
    status: "Reported",
  },
  {
    id: "case-001",
    reporterName: "Asha Sharma",
    location: { village: "Rampur", district: "Jaipur", state: "Rajasthan" },
    issueDate: "2023-10-26T10:00:00Z",
    details:
      "A report was received about a potential child marriage ceremony...",
    status: "Under Investigation",
  },
  {
    id: "case-003",
    reporterName: "Anonymous",
    location: {
      village: "Anantapur",
      district: "Anantapur",
      state: "Andhra Pradesh",
    },
    issueDate: "2023-09-15T09:00:00Z",
    details:
      "The marriage of a 14-year-old girl was successfully stopped by local authorities...",
    status: "Resolved",
  },
];
interface Message {
  id: number;
  text: string;
  sender: "user" | "authority";
  timestamp: string;
  attachments?: FileAttachment[];
}
interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

// --- Main Page Component ---
const ReportChatPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const caseId = params?.caseId as string;
  const caseData = dummyCases.find((c) => c.id === caseId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>(() => {
    if (!caseData) return [];
    return [
      {
        id: 1,
        text: `INITIAL REPORT:\n\nLocation: ${caseData.location.village}, ${caseData.location.district}\nDetails: ${caseData.details}`,
        sender: "user",
        timestamp: new Date(caseData.issueDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ];
  });

  const [newMessage, setNewMessage] = useState("");
  const [isAuthorityReplying, setIsAuthorityReplying] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<FileAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Reset state when the caseId changes
  useEffect(() => {
    if (caseData) {
      setMessages([
        {
          id: 1,
          text: `INITIAL REPORT:\n\nLocation: ${caseData.location.village}, ${caseData.location.district}\nDetails: ${caseData.details}`,
          sender: "user",
          timestamp: new Date(caseData.issueDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
      setUploadedFiles([]);
    }
  }, [caseId, caseData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAuthorityReplying]);
  useEffect(() => {
    if (caseData && messages.length === 1) {
      setIsAuthorityReplying(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: 2,
            text: "Thank you for your report. Your case has been received and assigned to the Sub-Divisional Magistrate (SDM) for immediate review. You will receive updates on the progress through this secure communication channel.",
            sender: "authority",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
        setIsAuthorityReplying(false);
      }, 1500); // Shorter delay for better UX
    }
  }, [messages.length, caseData]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" && uploadedFiles.length === 0) return;
    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachments: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setUploadedFiles([]);
    setIsAuthorityReplying(true);
    setTimeout(() => {
      const responses = [
        "Thank you for the additional information.",
        "Your message has been received and documented.",
        "Acknowledged. Updates will follow shortly.",
      ];
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: "authority",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setIsAuthorityReplying(false);
    }, 1500);
  };

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    const newFiles: FileAttachment[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        newFiles.push({
          id: Date.now() + i + "",
          name: file.name,
          size: file.size,
          type: file.type,
          url: URL.createObjectURL(file),
        });
      }
    }
    setTimeout(() => {
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setIsUploading(false);
    }, 1000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileUpload(files);
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };
  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${
      ["Bytes", "KB", "MB", "GB"][i]
    }`;
  };

  if (!caseData) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-700">No Case Selected</h1>
          <p className="text-gray-500 mt-2">
            Please select a case from the sidebar to view the chat.
          </p>
        </div>
      </div>
    );
  }

  return (
    // --- THE ONLY CHANGE IS HERE ---
    <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* The inner div was changed from h-screen to h-full */}
      <div className="max-w-4xl mx-auto h-full w-full flex flex-col">
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Back button logic is fine, it navigates to the root with the welcome message */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="hover:bg-slate-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Official Communication
                  </h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      Case ID: {caseData.id}
                    </Badge>
                    <span className="text-sm text-gray-500">DM/SDM Office</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Secure Channel</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* The rest of the component is unchanged as its logic is correct */}
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 px-4 py-6 sm:px-6">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-slate-200"
                    } rounded-2xl shadow-sm`}
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {msg.text}
                      </p>
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.attachments.map((file) => (
                            <div
                              key={file.id}
                              className={`flex items-center space-x-2 p-2 rounded-lg ${
                                msg.sender === "user"
                                  ? "bg-blue-500/20"
                                  : "bg-slate-50"
                              }`}
                            >
                              <FileText className="w-4 h-4 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs opacity-75">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="px-4 pb-2">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs ${
                            msg.sender === "user"
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {msg.timestamp}
                        </span>
                        {msg.sender === "user" && (
                          <CheckCircle className="w-3 h-3 text-blue-200" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isAuthorityReplying && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">
                        Authority is typing...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {uploadedFiles.length > 0 && (
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 sm:px-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Attachments:
                </p>
                <div className="flex flex-wrap gap-2">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center space-x-2 bg-white border border-slate-200 rounded-lg px-3 py-2"
                    >
                      <FileText className="w-4 h-4 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border-t border-slate-200 px-4 py-4 sm:px-6">
            <form onSubmit={handleSendMessage} className="space-y-3">
              <div
                className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
                  isDragOver
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="text-center">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag & drop files or{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      browse
                    </button>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports PDF & images up to 10MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,image/*"
                  onChange={(e) =>
                    e.target.files && handleFileUpload(e.target.files)
                  }
                  className="hidden"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-sm text-gray-600">
                        Uploading...
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <Textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="min-h-[44px] max-h-32 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={
                    newMessage.trim() === "" && uploadedFiles.length === 0
                  }
                  className="h-11 px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportChatPage;
