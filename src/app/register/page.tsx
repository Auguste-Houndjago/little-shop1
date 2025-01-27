'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '../api/uploadthing/core';
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();


  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);


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
    <div className="flex min-h-screen items-center justify-center bg-[#121212] py-2">
      <div className="w-full max-w-md border-2 border-transparent bg-[linear-gradient(#212121,#212121)_padding-box,linear-gradient(120deg,transparent_25%,#1cb0ff,#40ff99)_border-box] p-8 text-white rounded-2xl">
        <h1 className="mb-8 text-center text-2xl font-bold text-white">Completer Votre Profile</h1>
        
        {error && (
          <div className="mb-6 rounded-lg bg-red-900/50 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="relative">
  <input
    type="text"
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="peer w-full rounded-md border border-gray-700 bg-transparent p-3 text-white outline-none transition-all focus:border-[#1cb0ff] placeholder-transparent"
    required
    placeholder="Votre Nom"
  />
  <label
    htmlFor="name"
    className="absolute left-2 top-3 text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-[#1cb0ff] peer-focus:text-sm"
  >
    Nom 
  </label>
</div>


          <div className="space-y-2">
            <label className="block text-sm text-gray-400">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              {(previewUrl || avatarUrl) && (
                <div className="relative h-20 w-[108px] rounded-full border-2 border-[#1cb0ff]">
                  <Image
                    src={previewUrl || avatarUrl}
                    alt="Profile preview"
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
              )}
              <UploadButton<OurFileRouter, 'imageOne'>
                endpoint="imageOne"
                onBeforeUploadBegin={(files) => {
                 
                  if (files[0]) {
                    
                    if (previewUrl) {
                      URL.revokeObjectURL(previewUrl);
                    }
                    setPreviewUrl(URL.createObjectURL(files[0]));
                  }
                  return files;
                }}
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    setAvatarUrl(res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  setError(`Upload failed: ${error.message}`);
                }}
                appearance={{
                  button: "bg-white/10 text-gray-400 border border-gray-700 py-2 px-4 rounded-md hover:bg-[#212121] hover:border-[#1cb0ff] transition-all duration-200",
                  container: "w-full flex justify-start items-center"
                }}
              />
            </div>
          </div>

          <div className="relative">
          <PhoneInput
  country={'tg'}
  value={phone}
  onChange={(phone) => setPhone('+' + phone)}
  inputClass="!w-full !bg-transparent !border !p-3 !pl-12 !border-gray-700 !rounded-md !text-white !outline-none hover:!border-[#1cb0ff] focus:!border-[#1cb0ff] !transition-all"
  containerClass="w-full"
  buttonClass="!absolute !left-0 !top-0 !border !border-gray-700 !bg-transparent hover:!border-[#1cb0ff] !transition-all"
  searchClass=" !bg-[#121212]  !text-white "
  dropdownClass="!border !border-gray-700  !bg-[#112121] !text-black"
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
            className="mt-2 w-full rounded-md border border-gray-700 bg-white/10 p-3 text-gray-400 transition-all duration-200 hover:bg-[#212121] hover:border-[#1cb0ff] cursor-pointer"
          >
            Continuer
          </button>
        </form>
      </div>
    </div>
  );
}