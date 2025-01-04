import { useState, ChangeEvent, DragEvent } from "react";
import * as XLSX from "xlsx";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { Button } from "@/components/custom/button";
import { FileIcon } from "@radix-ui/react-icons";
import { usePhonebook } from "@/hooks/api-hooks/contacts/phonebook-hoook";
import { Input } from "@/components/ui/input"; 
import { Label } from "@/components/ui/label";

export default function Component() {
  const [files, setFiles] = useState<File[]>([]);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [name, setName] = useState<string>(""); // Name field
  const [description, setDescription] = useState<string>(""); // Description field
  const { uploadPhoneBook } = usePhonebook();

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(
      (file) => file.name.endsWith(".xlsx") || file.name.endsWith(".xls")
    );

    if (validFiles.length !== files.length) {
      setIsInvalid(true);
      setErrorMessage("Only Excel files (.xlsx, .xls) are allowed.");
    } else {
      setFiles(validFiles);
      setIsInvalid(false);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      setErrorMessage("Please upload an Excel file.");
      return;
    }

    if (!name.trim()) {
      setErrorMessage("Please provide a name for the phonebook.");
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;
      if (data) {
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Check if the first column contains phone numbers
        const firstColumn = json.map((row: any) => row[0]);
        // const phoneNumberRegex = /^\+?\d{10,15}$/;

        // const isValid = firstColumn.every((cell: any) =>
        //   phoneNumberRegex.test(cell)
        // );

        // if (!isValid) {
        //   setErrorMessage("The first column must contain valid phone numbers.");
        //   return;
        // }

        if (firstColumn.length === 0) {
          setErrorMessage("The file is empty or has no data.");
          return;
        }

        // Submit the file to the server
        submitFileToServer(file);
      }
    };

    reader.readAsBinaryString(file);
  };

  const submitFileToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("name", name); 
    // formData.append("description", description);


    const finalData = {
        fileData: formData,
        params: {
            name: name,
            description: description
        }
    }

    try {
      uploadPhoneBook.mutate({ data: finalData });
    } catch (error) {
      setErrorMessage("An error occurred while uploading the file.");
    }
  };

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="flex flex-col bg-background">
          <h2 className="text-2xl font-semibold mb-6">Upload Phonebook File</h2>
          {/* Name and Description Fields */}
          <div className="mt-6 space-y-4 w-full max-w-xl mb-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter phonebook name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="Enter phonebook description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div
            className="relative w-full max-w-xl p-8 bg-card rounded-lg shadow-lg"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-muted rounded-md">
              {files.length > 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-muted-foreground">
                    File ready: <strong>{files[0].name}</strong>
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <UploadIcon className="w-12 h-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Drag and drop Excel files here or{" "}
                    <label
                      htmlFor="file-input"
                      className="font-medium text-primary cursor-pointer"
                    >
                      import
                    </label>
                  </p>
                </div>
              )}
              <input
                id="file-input"
                type="file"
                accept=".xlsx, .xls"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileInput}
              />
            </div>
            {isInvalid && (
              <div className="mt-4 text-red-500">{errorMessage}</div>
            )}
          </div>

          

          {/* Save Button */}
          {files.length > 0 && (
            <div className="flex justify-start w-full mt-6">
              <Button
                type="submit"
                onClick={handleSubmit}
                loading={uploadPhoneBook.isPending}
                disabled={uploadPhoneBook.isPending}
              >
                Save File
                <FileIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Layout.Body>
    </Layout>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}