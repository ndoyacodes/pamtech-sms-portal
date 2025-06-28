import { useEffect, useState } from 'react'
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/custom/button'
import { UploadCloud, BadgeCheck, Clock, XCircle, Info } from 'lucide-react'
import { Layout } from '@/components/custom/layout'
import { customerService } from '@/api/services/customers/customer.service' // use your service here
import { toast } from 'react-toastify'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

type VerificationDocKey = 'tin' | 'business' | 'brela' | 'nida'
type DocStatusType = 'required' | 'in_review' | 'approved' | 'rejected'

const verificationDocs: { key: VerificationDocKey; label: string }[] = [
  { key: 'tin', label: 'TIN Certificate of Business' },
  { key: 'business', label: 'Business Certificate' },
  { key: 'brela', label: 'BLERA Certificate' },
  { key: 'nida', label: 'NIDA of CEO/Manager' },
]

const docDescriptions: Record<VerificationDocKey, string> = {
  tin: 'Upload a valid TIN certificate issued by TRA.',
  business: 'Upload the official Business Registration Certificate.',
  brela: 'Upload your official Brela certificate.',
  nida: 'Upload the national ID of the CEO or company manager.',
}

const statusDisplay: Record<DocStatusType, { label: string; color: string; icon: JSX.Element }> = {
  required: { label: 'Required', color: 'text-gray-500', icon: <UploadCloud className="w-4 h-4" /> },
  in_review: { label: 'In Review', color: 'text-yellow-500', icon: <Clock className="w-4 h-4" /> },
  approved: { label: 'Approved', color: 'text-green-600', icon: <BadgeCheck className="w-4 h-4" /> },
  rejected: { label: 'Rejected', color: 'text-red-500', icon: <XCircle className="w-4 h-4" /> },
}

export default function VerificationPage() {
  const customerId = 1 

  const [files, setFiles] = useState<Record<VerificationDocKey, File | null>>({
    tin: null, business: null, brela: null, nida: null,
  })

  const [submittedUrls, setSubmittedUrls] = useState<Record<VerificationDocKey, string | null>>({
    tin: null, business: null, brela: null, nida: null,
  })

  const [docStatus] = useState<Record<VerificationDocKey, DocStatusType>>({
    tin: 'in_review', business: 'required', brela: 'approved', nida: 'rejected',
  })

  const [showDescriptions, setShowDescriptions] = useState<Record<VerificationDocKey, boolean>>({
    tin: false, business: false, brela: false, nida: false,
  })

  useEffect(() => {
    async function fetchDocs() {
      try {
        // Assume your customerService has a method to get the KYC files/info
        const response = await customerService.getCustomerKycFile(customerId)
        const data = (response as any).data

        const urlMap: Record<VerificationDocKey, string | null> = {
          tin: data?.tinUrl ?? null,
          business: data?.businessUrl ?? null,
          brela: data?.brelaUrl ?? null,
          nida: data?.nidaUrl ?? null,
        }
        setSubmittedUrls(urlMap)

        // setDocStatus({
        //   tin: data?.tinStatus || 'required',
        //   business: data?.businessStatus || 'required',
        //   brela: data?.brelaStatus || 'required',
        //   nida: data?.nidaStatus || 'required',
        // })

      } catch (error) {
        console.error('Failed to fetch documents', error)
      }
    }

    fetchDocs()
  }, [customerId])

  const handleFileChange = (key: VerificationDocKey, file: File | null) => {
    setFiles((prev) => ({ ...prev, [key]: file }))
  }

  const handleUpload = async (key: VerificationDocKey) => {
    const file = files[key]
    if (!file) {
      toast.warn(`No file selected for ${key.toUpperCase()}`)
      return
    }

    try {
      const formData = new FormData()
      formData.append('file', file, file.name)
      formData.append('attachmentType', key)
      formData.append('customerId', String(customerId))

      await customerService.uploadCustomerAttachment(formData)

      toast.success(`${key.toUpperCase()} document uploaded successfully`)
      setFiles((prev) => ({ ...prev, [key]: null }))

      // You may want to refresh or update submittedUrls here if your backend provides new URL after upload
      setSubmittedUrls((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }))
    } catch (error) {
      console.error(error)
      toast.error(`Failed to upload ${key.toUpperCase()}`)
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <h1 className="text-2xl font-bold mb-6">Edit Verification Documents</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verificationDocs.map((doc) => {
            const file = files[doc.key]
            const status = docStatus[doc.key]
            const showDescription = showDescriptions[doc.key]
            const submittedUrl = submittedUrls[doc.key]

            return (
              <Card key={doc.key}>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div>
                      <span>{doc.label}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setShowDescriptions((prev) => ({ ...prev, [doc.key]: !prev[doc.key] }))
                        }
                        className="text-xs text-blue-600 hover:underline ml-2"
                      >
                        <Info className="inline w-3 h-3" /> {showDescription ? 'Hide Info' : 'More Info'}
                      </button>
                    </div>
                    <span className={`text-sm ${statusDisplay[status].color} flex items-center gap-1`}>
                      {statusDisplay[status].icon}
                      {statusDisplay[status].label}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {showDescription && (
                    <p className="text-sm bg-muted rounded p-2 border">{docDescriptions[doc.key]}</p>
                  )}
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    onChange={(e) => handleFileChange(doc.key, e.target.files?.[0] ?? null)}
                    className="w-full file:mr-4 file:rounded-md file:bg-primary file:px-4 file:py-2 file:text-white"
                  />
                  {file && <p className="text-sm text-gray-600">Selected: <strong>{file.name}</strong></p>}
                  <Button
                    onClick={() => handleUpload(doc.key)}
                    disabled={!file}
                    className="flex gap-2"
                  >
                    <UploadCloud className="w-4 h-4" /> Upload Document
                  </Button>
                  {submittedUrl && (
                    <a
                      href={submittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline"
                    >
                      Download Submitted Document
                    </a>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Layout.Body>
    </Layout>
  )
}
