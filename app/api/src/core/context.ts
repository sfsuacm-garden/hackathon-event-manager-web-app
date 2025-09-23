import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { supabase } from "../config/supabase";
import type { User } from "@supabase/supabase-js";


export async function createContext({req, res}: CreateExpressContextOptions) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    let user: User | null = null; 

    if(token) {
        const {data, error} = await supabase.auth.getUser(token);
        user = data?.user ?? null;
    }

  
    
    return {
        req,
        res,
        user
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>;