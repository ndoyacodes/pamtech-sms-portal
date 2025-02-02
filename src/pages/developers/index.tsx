import { useState } from 'react';
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
import { IconCopy } from '@tabler/icons-react';
import { Layout } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { dashboardService } from '@/api/services/dashboard/dashboard.service';
import { toast } from 'react-toastify';

const DeveloperDashboard = () => {
  const [apiToken, setApiToken] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [viewKey, setViewKey] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const form = useForm({
    defaultValues: {
      endpoint: 'https://opessms.yared.codes/api/v1/sms/send',
    }
  });

  const regenerateToken = async () => {
     try {
      setIsLoading(true);

      const response =  await dashboardService.generateCustomerApiKey();
      if (response) {
        setViewKey(true);
        toast.success('API Token Regenerated Successfully');
        setApiToken(response?.body?.apiKey);
      }
     } catch (error) {
      toast.error('Failed to regenerate API Token, Please try again later!');
     }finally{
      setIsLoading(false);
     }
   
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
    {/* ===== Top Heading ===== */}
       <Layout.Header sticky className='mt-4 lg:mt-0 md:mt-0 sm:mt-4'>
      <Search />
      <div className='ml-auto flex items-center space-x-4'>
        <ThemeSwitch />
        <UserNav />
      </div>
    </Layout.Header>

    <Layout.Body>
    <div className="max-w-4xl  ">
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
              className=""
              onClick={regenerateToken}
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
                      <Input {...field} readOnly className="" />
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
                    value={apiToken}
                    readOnly 
                    className="pr-10 "
                    hidden={!viewKey} 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    loading={isLoading}
                    onClick={copyToClipboard}
                  >
                    <IconCopy className="h-4 w-4" />
                  </Button>
                </div>
                {copied && (
                  <FormDescription className="text-green-600">
                    Copied to clipboard!
                  </FormDescription>
                )}
              </FormItem>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
    </Layout.Body></Layout>
  );
};

export default DeveloperDashboard;