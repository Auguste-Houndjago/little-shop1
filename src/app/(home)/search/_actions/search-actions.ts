'use server';

import { createClient } from '@/utils/supabase/server';

export async function fetchCategories() {
  const supabase = createClient();
  
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('id, name');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return categories;
  } catch (error) {
    console.error('Unexpected error fetching categories:', error);
    return [];
  }
}

export async function fetchSellers() {
  const supabase = createClient();
  
  try {
    const { data: sellers, error } = await supabase
      .from('sellers')
      .select('id, name');

    if (error) {
      console.error('Error fetching sellers:', error);
      return [];
    }

    return sellers;
  } catch (error) {
    console.error('Unexpected error fetching sellers:', error);
    return [];
  }
}

export async function fetchLocations() {
  const supabase = createClient();
  
  try {
    const { data: locations, error } = await supabase
      .from('locations')
      .select('id, name');

    if (error) {
      console.error('Error fetching locations:', error);
      return [];
    }

    return locations;
  } catch (error) {
    console.error('Unexpected error fetching locations:', error);
    return [];
  }
}