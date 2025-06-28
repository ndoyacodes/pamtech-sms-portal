import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/custom/button';
import { ShieldCheck, BadgeCheck, Clock, XCircle, UploadCloud } from 'lucide-react';
import { Progress } from './ui/progress';
import { useNavigate } from 'react-router-dom'; 
import { useState } from 'react';

type VerificationDocKey = 'tin' | 'business' | 'blera' | 'nida';

type DocStatusType = 'required' | 'in_review' | 'approved' | 'rejected';

const verificationDocs: {
  key: VerificationDocKey;
  label: string;
}[] = [
  {
    key: 'tin',
    label: 'TIN Certificate of Business',
  },
  {
    key: 'business',
    label: 'Business Certificate',
  },
  {
    key: 'blera',
    label: 'BLERA Certificate',
  },
  {
    key: 'nida',
    label: 'NIDA of CEO/Manager',
  },
];

const initialStatus: Record<VerificationDocKey, DocStatusType> = {
  tin: 'required',
  business: 'required',
  blera: 'required',
  nida: 'required',
};

const statusDisplay = {
  required: {
    label: 'Required',
    color: 'text-gray-500',
    icon: <UploadCloud className="w-4 h-4" />,
  },
  in_review: {
    label: 'In Review',
    color: 'text-yellow-500',
    icon: <Clock className="w-4 h-4" />,
  },
  approved: {
    label: 'Approved',
    color: 'text-green-600',
    icon: <BadgeCheck className="w-4 h-4" />,
  },
  rejected: {
    label: 'Rejected',
    color: 'text-red-500',
    icon: <XCircle className="w-4 h-4" />,
  },
};

const VerificationCard = () => {
  const [docStatus] = useState<Record<VerificationDocKey, DocStatusType>>(initialStatus);
  const navigate = useNavigate();

  // Calculate progress (number of approved docs / total)
  const completed = Object.values(docStatus).filter((s) => s === 'approved').length;
  const progress = (completed / verificationDocs.length) * 100;

  const handleEditClick = () => {
    navigate('/verification'); // Adjust the route as needed
  };

  return (
    <Card>
      <CardHeader className="border-b pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            Profile Verification
          </CardTitle>
          <Button variant="outline" size="sm" onClick={handleEditClick}>
            Edit documents
          </Button>
        </div>
        <div className="w-full mt-4">
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-gray-500 mt-1 text-right">
            {completed} of {verificationDocs.length} documents approved
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verificationDocs.map((doc) => {
            const status = docStatus[doc.key];
            const statusInfo = statusDisplay[status];
            return (
              <div
                key={doc.key}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border"
              >
                <span className="font-medium">{doc.label}</span>
                <span className={`flex items-center gap-1 font-medium ${statusInfo.color}`}>
                  {statusInfo.icon}
                  {statusInfo.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationCard;