import { Layout } from '@/components/custom/layout';
import { UserNav } from '@/components/user-nav';
import ThemeSwitch from '@/components/theme-switch';
import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';

const PricingPage = () => {
    return (
        <Layout>
            <Layout.Header sticky className="mt-4 sm:mt-4 md:mt-0 lg:mt-0 z-100">
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

            <Layout.Body>
               <Card className="w-full max-w-d ">
            <CardHeader>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg font-semibold text-muted-foreground">
                Coming Soon ...
              </p>
            </CardContent>
          </Card>
            </Layout.Body>
        </Layout>
    );
};

export default PricingPage;

