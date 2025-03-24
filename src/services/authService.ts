import { supabase } from '../lib/supabase';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export const authService = {
  // Login com email e senha
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Cadastro com email e senha
  async signup(email: string, password: string, name?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) throw error;
    return data;
  },

  // Logout
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Obter usuário atual
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Verificar se está autenticado
  async isAuthenticated() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return  !!session;
  },
}; 