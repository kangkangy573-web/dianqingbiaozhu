const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;

// Try to create Supabase client if configuration is available
if (supabaseUrl && supabaseServiceKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseServiceKey);
  } catch (error) {
    console.warn('Supabase initialization failed:', error.message);
    console.warn('Using mock data for development');
  }
} else {
  console.warn('Missing Supabase configuration');
  console.warn('Using mock data for development');
}

module.exports = supabase;