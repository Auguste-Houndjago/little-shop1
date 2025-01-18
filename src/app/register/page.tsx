'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '../api/uploadthing/core';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!avatarUrl) {
      setError('Please upload a profile picture');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('User not authenticated');
        return;
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: user.email,
          avatar_url: avatarUrl,
          phone,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to register user');
      }

      router.push('/'); 
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Complete Your Profile</h1>
        
        {error && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-6">
              {avatarUrl && (
                <div className="relative w-24 h-24 border-4 border-indigo-200 rounded-full">
                  <Image
                    src={avatarUrl}
                    alt="Profile preview"
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
              )}
              <UploadButton<OurFileRouter, 'imageOne' >
                endpoint="imageOne"
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    setAvatarUrl(res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  setError(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button: "bg-slate-800  hover:bg-slate-700 text-white py-2 px-4 rounded-full transition duration-300",
                  container: "w-full flex justify-start items-center"
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <PhoneInput
              country={'tg'}
              value={phone}
              onChange={(phone) => setPhone('+' + phone)}
              inputClass="!w-full !h-12 !px-4 !py-2 !border !border-gray-300 !rounded-lg !shadow-sm focus:!outline-none focus:!ring-2 focus:!ring-indigo-500 focus:!border-indigo-500"
              containerClass="w-full"
              buttonClass="!border !border-gray-300 !bg-gray-50 hover:!bg-gray-100 !rounded-l-lg"
              searchClass="!border !border-gray-300 !bg-white"
              dropdownClass="!border !border-gray-300 !bg-white"
              enableSearch
              preferredCountries={['tg', 'gh', 'ng', 'bj', 'ci', 'bf']}
              enableAreaCodes={true}
              autoFormat={true}
              countryCodeEditable={false}
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
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
           Continuer
          </button>
        </form>
      </div>
    </div>
  );
}