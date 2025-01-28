import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () => {
  // Return a function that creates the client only when called
  return () => {
    // Only attempt to use cookies in a server context
    if (typeof window === 'undefined') {
      const cookieStore = cookies();

      return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              try {
                cookieStore.set({ name, value, ...options });
              } catch (error) {
                // Handle or log error if needed
              }
            },
            remove(name: string, options: CookieOptions) {
              try {
                cookieStore.set({ name, value: "", ...options });
              } catch (error) {
                // Handle or log error if needed
              }
            },
          },
        }
      );
    }

    // For client-side, return a Supabase client with empty cookies configuration
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get() { return null; },
          set() {},
          remove() {},
        }
      }
    );
  };
};
