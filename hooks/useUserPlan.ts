'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

type Plan = 'free' | 'pro' | null;

export function useUserPlan(): { plan: Plan; loading: boolean } {
    const [plan, setPlan] = useState<Plan>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
                );

                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setPlan('free');
                    return;
                }

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('plan')
                    .eq('id', user.id)
                    .single();

                setPlan((profile?.plan as Plan) ?? 'free');
            } catch {
                setPlan('free');
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, []);

    return { plan, loading };
}
