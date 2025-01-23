import { useLocation } from 'react-router-dom';
import { FormSchema, formSchema } from '../data/plans-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import { Layout } from '@/components/custom/layout';
import { Search } from '@/components/search';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { IconUserPlus } from '@tabler/icons-react';
import { Checkbox } from '@/components/ui/checkbox';
import { usePlan } from '@/hooks/api-hooks/plan/plan-hooks';

const AddEditPlan = () => {
  const location = useLocation();
  const currentPlan = location.state?.record; 
  const {createPlan,updatePlan} =  usePlan();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: currentPlan || {
      name: '',
      pricePerSms: 0,
      billingCycle: 'MONTHLY',
      customerVisible: false,
      popular: false,
    },
  });

  const onSubmit = (data: FormSchema) => {
    const finalData = {
      ...data,
    };
    console.log(finalData);
   if(currentPlan){
     updatePlan.mutate({id:currentPlan.id,data:{...finalData, id:currentPlan.id}})
   }else{
      createPlan.mutate({data:finalData})
   }
  };

  const isLoading = createPlan.isPending || updatePlan.isPending;

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
        <div className='mb-4 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              {currentPlan ? 'Edit Plan' : 'Add New Plan'}
            </h2>
            <p className='text-muted-foreground'>
              {currentPlan
                ? 'Update the plan details below'
                : 'Fill in the form below to create a new plan'}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {/* Left Column */}
              <div className='space-y-4'>
                {/* Plan Name Input Field */}
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter plan name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price Input Field */}
                <FormField
                  control={form.control}
                  name='pricePerSms'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Enter price'
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Billing Cycle Select Field */}
                <FormField
                  control={form.control}
                  name='billingCycle'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billing Cycle</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder='Select billing cycle' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='DAILY'>Daily</SelectItem>
                            <SelectItem value='WEEKLY'>Weekly</SelectItem>
                            <SelectItem value='MONTHLY'>Monthly</SelectItem>
                            <SelectItem value='YEARLY'>Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              {/* Customer Visible Checkbox */}
              <FormField
                control={form.control}
                name='customerVisible'
                render={({ field }) => (
                <FormItem className='flex items-center space-x-2'>
                  <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    // disabled={currentPlan?.customerVisible}
                  />
                  </FormControl>
                  <FormLabel>Customer Visible</FormLabel>
                  {currentPlan?.customerVisible && (
                  <p className="text-sm text-muted-foreground">
                    Cannot change visibility of existing plans
                  </p>
                  )}
                </FormItem>
                )}
              />
                {/* Popular Plan Checkbox */}
                <FormField
                  control={form.control}
                  name='popular'
                  render={({ field }) => (
                    <FormItem className='flex items-center space-x-2'>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          // disabled={currentPlan?.popular}
                        />
                      </FormControl>
                      <FormLabel>Mark as Popular Plan</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className='mt-6'>
              <Button type='submit' className=''
              loading={isLoading}
              disabled={isLoading}
              >
                {currentPlan ? 'Update Plan' : 'Create Plan'}
                <IconUserPlus className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </form>
        </Form>
      </Layout.Body>
    </Layout>
  );
};

export default AddEditPlan;