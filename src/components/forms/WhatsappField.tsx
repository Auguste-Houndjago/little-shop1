'use client';

import { Control } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/textarea';

interface WhatsappFieldProps {
  control: Control<any>;
  isLoading?: boolean;
}

export const WhatsappField = ({ control, isLoading }: WhatsappFieldProps) => {
  const form = useFormContext();

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">WhatsApp Contact (Optionnel)</Label>
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="whatsappNumber"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Numéro WhatsApp</FormLabel>
              <FormControl>
                <PhoneInput
                  country={'tg'}
                  value={value}
                  onChange={phone => onChange('+' + phone)}
                  disabled={isLoading}
                  inputClass={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  containerClass="w-full"
                  buttonClass={cn(
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  searchClass="bg-background border border-input"
                  dropdownClass="bg-background border border-input"
                  enableSearch
                  specialLabel=""
                  preferredCountries={['tg', 'gh', 'ng', 'bj', 'ci', 'bf']}
                  enableAreaCodes={true}
                  autoFormat={true}
                  countryCodeEditable={false}
                  enableAreaCodeStretch
                  masks={{
                    tg: '.. .. .. ..', 
                    gh: '... ... ....', 
                    ng: '... ... ....', 
                    bj: '.. .. .. ..', 
                    ci: '.. .. .. ..', 
                    bf: '.. .. .. ..' 
                  }}

                  localization={{
                    tg: 'Togo',
                    gh: 'Ghana',
                    ng: 'Nigeria',
                    bj: 'Bénin',
                    ci: 'Côte d\'Ivoire',
                    bf: 'Burkina Faso'
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="whatsappMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message WhatsApp (optionnel)</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className={cn(
                    "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    isLoading && "opacity-50 cursor-not-allowed"
                  )}
                  placeholder="Ex: Bonjour, je suis intéressé par votre produit..."
                  disabled={isLoading}
                />

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
};
