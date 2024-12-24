'use client';

import { Control } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface WhatsappFieldProps {
  control: Control<any>;
  isLoading?: boolean;
}

export const WhatsappField = ({ control, isLoading }: WhatsappFieldProps) => {
  return (
    <div className="space-y-4">
      <Label>WhatsApp Contact (Optionnel)</Label>
      <FormField
        control={control}
        name='whatsappNumber'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro WhatsApp</FormLabel>
            <FormControl>
              <Input
                disabled={isLoading}
                placeholder='Ex: +33612345678'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='whatsappMessage'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Message WhatsApp</FormLabel>
            <FormControl>
              <Textarea
                disabled={isLoading}
                placeholder='Message envoyé sur WhatsApp'
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
