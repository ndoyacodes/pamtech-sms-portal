import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/custom/button';
import { Layout } from '@/components/custom/layout';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const CampaignDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const campaign = location.state?.campaign;

  return (
    <Layout>
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <Button onClick={() => navigate('/automations')}>
            Back to Automations
          </Button>
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mx-auto max-w-4xl p-6'>
          <h1 className='mb-6 text-3xl font-bold'>{campaign.name}</h1>

          {/* Campaign Details in 2x2 Grid */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {/* Basic Information Card */}
            <div className='rounded-lg border p-6 shadow-sm'>
              <h2 className='mb-4 text-xl font-semibold'>Basic Information</h2>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Description</p>
                  <p className='text-lg'>{campaign.description || 'N/A'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Status</p>
                  <Badge variant={campaign.active ? 'success' : 'destructive'}>
                    {campaign.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className='rounded-lg border p-6 shadow-sm'>
              <h2 className='mb-4 text-xl font-semibold'>Schedule</h2>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Start Date</p>
                  <p className='text-lg'>
                    {format(new Date(campaign.startDate), 'yyyy-MM-dd')}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>End Date</p>
                  <p className='text-lg'>
                    {format(new Date(campaign.endDate), 'yyyy-MM-dd')}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Recurring Period</p>
                  <p className='text-lg'>{campaign.recurringPeriod || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Sender and Message Card */}
            <div className='rounded-lg border p-6 shadow-sm'>
              <h2 className='mb-4 text-xl font-semibold'>Sender and Message</h2>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Sender</p>
                  <p className='text-lg'>{campaign.sender || 'N/A'}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Message Template</p>
                  <p className='text-lg'>{campaign.messageTemplate || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Additional Information Card */}
            <div className='rounded-lg border p-6 shadow-sm'>
              <h2 className='mb-4 text-xl font-semibold'>Additional Information</h2>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-500'>Next Run</p>
                  <p className='text-lg'>
                    {/*{campaign.nextRun ? format(new Date(campaign.nextRun), 'yyyy-MM-dd HH:mm') : 'N/A'}*/}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Recurring</p>
                  <p className='text-lg'>{campaign.recurring ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default CampaignDetailsPage;