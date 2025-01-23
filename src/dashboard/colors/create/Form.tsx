'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form as FormShadcnUI,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ColorPickerModal from '@/components/modals/ColorPickerModal';

import { saveColorValidation } from '../_utils/validations';
import { saveColor } from '../_utils/actions';

import { toast } from 'sonner';

const Form = () => {
  const router = useRouter();
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false);

  const defaultValues = {
    name: '',
    color: '',
  };

  const form = useForm<z.infer<typeof saveColorValidation>>({
    resolver: zodResolver(saveColorValidation),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof saveColorValidation>) => {
    const { name, color } = values;

    try {
      const { success } = await saveColor({ name, color });

      if (success) {
        form.reset(defaultValues);
        toast.success('Color created.');
        router.push('/dashboard/colors');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong.');
    }
  };

  const handleColorSelect = (selectedColor: string) => {
    form.setValue('color', selectedColor);
  };

  return (
    <>
      <FormShadcnUI {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Color name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='color'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Input placeholder='#000000' {...field} />
                  </FormControl>
                  <div 
                    className="w-10 h-10 rounded-full border cursor-pointer"
                    style={{ backgroundColor: field.value || '#ffffff' }}
                    onClick={() => setIsColorPickerOpen(true)}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex justify-end'>
            <Button
              type='submit'
              className='ml-auto'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </FormShadcnUI>

      <ColorPickerModal
        open={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        onColorSelect={handleColorSelect}
        initialColor={form.getValues('color') || '#000000'}
      />
    </>
  );
};

export default Form;
