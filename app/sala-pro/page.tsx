import { redirect } from 'next/navigation';
import SalaProClient from '@/components/SalaProClient';
import { createClient } from '@/lib/supabase/server';

export default async function SalaProPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login?next=/sala-pro');
    }

    return (
        <SalaProClient
            userId={user.id}
            userEmail={user.email ?? null}
            userFullName={user.user_metadata?.full_name ?? null}
        />
    );
}
