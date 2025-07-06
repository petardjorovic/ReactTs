import type { Session, User, WeakPassword } from "@supabase/supabase-js";
import supabase from "./supabaseClient";

type LoginProps = {
  email: string;
  password: string;
};

export type LoginReturnDataType = {
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword;
};

export async function login({
  email,
  password,
}: LoginProps): Promise<LoginReturnDataType> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
