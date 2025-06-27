import { useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function DocumentUploadModal({ isOpen, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = () => {
    if (!file) {
      alert("Please upload a document.")
      return
    }
    console.log("Uploading file:", file)
   
    onClose()
  }

  const handleCancel = () => {
    alert("You will be suspended if you don't upload your documents.")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Upload Your Document</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 w-full"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
