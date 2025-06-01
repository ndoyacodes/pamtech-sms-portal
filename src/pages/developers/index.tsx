import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/custom/button';
import { IconCopy, IconEye, IconEyeOff } from '@tabler/icons-react';
import { Layout } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { dashboardService } from '@/api/services/dashboard/dashboard.service';
import { toast } from 'react-toastify';

const DeveloperDashboard = () => {
  const [tokenData, setTokenData] = useState({
    apiKey: '',
    expired: false,
    expiryDate: '',
    createdAt: '',
    id: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const form = useForm({
    defaultValues: {
      endpoint: 'https://pamtechsms.yared.codes/api/v1/sms/send',
    }
  });

  const fetchTokenData = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardService.generateCustomerApiKey();
      if (response?.body) {
        setTokenData(response.body);
      }
    } catch (error) {
      toast.error('Failed to fetch API Token details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, []);

  const regenerateToken = async () => {
    try {
      setIsLoading(true);
      const response = await dashboardService.generateCustomerApiKey();
      if (response?.body) {
        setTokenData(response.body);
        setShowKey(true);
        toast.success('API Token Regenerated Successfully');
      }
    } catch (error) {
      toast.error('Failed to regenerate API Token, Please try again later!');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenData.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString:any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout>
      <Layout.Header sticky className="mt-4 lg:mt-0 md:mt-0 sm:mt-4">
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <span>Dashboard</span>
            <span>/</span>
            <span>Developers</span>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4 mb-8">
                <Button 
                  variant="default" 
                  onClick={regenerateToken}
                  loading={isLoading}
                >
                  Regenerate Token
                </Button>
                <Button variant="outline">
                  Read the Docs
                </Button>
              </div>

              <Form {...form}>
                <div className="space-y-6">
                  <FormField
                    name="endpoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          API Endpoint
                        </FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      API Token
                    </FormLabel>
                    <div className="relative">
                      <Input 
                        value={showKey ? tokenData.apiKey : '••••••••••••••••'}
                        readOnly 
                        className="pr-24"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowKey(!showKey)}
                        >
                          {showKey ? (
                            <IconEyeOff className="h-4 w-4" />
                          ) : (
                            <IconEye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={copyToClipboard}
                        >
                          <IconCopy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {copied && (
                      <FormDescription className="text-green-600">
                        Copied to clipboard!
                      </FormDescription>
                    )}
                  </FormItem>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Expiry Date
                      </FormLabel>
                      <FormControl>
                        <Input 
                          value={tokenData.expiryDate ? formatDate(tokenData.expiryDate) : 'N/A'}
                          readOnly
                          className={tokenData.expired ? 'text-red-500' : ''}
                        />
                      </FormControl>
                      {tokenData.expired && (
                        <FormDescription className="text-red-500">
                          Token has expired
                        </FormDescription>
                      )}
                    </FormItem>

                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Created At
                      </FormLabel>
                      <FormControl>
                        <Input 
                          value={tokenData.createdAt ? formatDate(tokenData.createdAt) : 'N/A'}
                          readOnly
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default DeveloperDashboard;