import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Faltan variables de entorno de Supabase');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, image_url')
    .eq('status', 'published')
    .order('publish_date', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error al consultar:', error);
    return;
  }

  console.log('URLs actuales:');
  console.log(data);

}

main();
