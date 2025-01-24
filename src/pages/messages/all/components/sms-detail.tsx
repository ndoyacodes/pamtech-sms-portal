import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Layout } from '@/components/custom/layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  User,
  Building,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';

export const SMSView = () => {
    const location = useLocation();
    const sms = location.state?.sms;

    console.log("This is sms ", sms)

  if (!sms) {
    return (
      <Layout>
        <Layout.Body>
          <Card className="mx-auto max-w-6xl p-6">
            <div className="flex items-center justify-center space-x-2 text-destructive">
              <AlertCircle size={20} />
              <p>Error loading SMS details</p>
            </div>
          </Card>
        </Layout.Body>
      </Layout>
    );
  }

  return (
    <Layout>
         <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="max-w-6xl space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold pr-6">SMS Details</span>
              <Badge variant={sms?.status === 'FAILED' ? 'destructive' : 'default'}>
                {sms?.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Message Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Message ID</p>
                    <p className="text-sm font-medium">{sms?.messageId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                    <p className="text-sm font-medium">{sms?.recipient}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sender ID</p>
                    <p className="text-sm font-medium">{sms?.sender?.senderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Network</p>
                    <Badge variant="outline">{sms?.network}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SMS Count</p>
                    <p className="text-sm font-medium">{sms?.smsCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SMS Type</p>
                    <Badge variant="outline">{sms?.smsType}</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Message Content</p>
                  <p className="whitespace-pre-wrap rounded-lg border p-4 mt-2">
                    {sms?.message}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="text-sm font-medium">
                    {sms?.customer?.firstName} {sms?.customer?.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">{sms?.customer?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company</p>
                  <p className="text-sm font-medium">{sms?.customer?.companyName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer Type</p>
                  <Badge variant="outline">{sms?.customer?.customerType}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Date Sent</p>
                    <p className="text-sm font-medium">
                      {format(new Date(sms?.dateSent), 'PPp')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created At</p>
                    <p className="text-sm font-medium">
                      {format(new Date(sms?.createdAt), 'PPp')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Updated At</p>
                    <p className="text-sm font-medium">
                      {format(new Date(sms?.updatedAt), 'PPp')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Delivery Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge 
                      variant={sms?.status === 'FAILED' ? 'destructive' : 'default'}
                    >
                      {sms?.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SMSC Status</p>
                    <p className="text-sm font-medium">{sms?.statusSmsc || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">DLR</p>
                    <p className="text-sm font-medium">{sms?.dlr || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sending Network</p>
                    <p className="text-sm font-medium">{sms?.sendingNetwork || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default SMSView;