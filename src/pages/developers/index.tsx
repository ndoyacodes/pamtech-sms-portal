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

const DeveloperDashboard = () => {
  const [apiToken, setApiToken] = useState('2i1HMrCCBT7xeChkZBfxI59UfxhI8G31LM2BhuKeOL6');
  const [copied, setCopied] = useState(false);
  
  const form = useForm({
    defaultValues: {
      endpoint: 'https://www.messagimg.opestechnologies.co.tz/api/v3/',
    }
  });

  const regenerateToken = () => {
    // Simulate token regeneration
    const newToken = Math.random().toString(36).substring(2) + 
                    Math.random().toString(36).substring(2);
    setApiToken(newToken);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
    {/* ===== Top Heading ===== */}
    <Layout.Header sticky>
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
                      OAuth 2.0 API Endpoint
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
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
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