import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await isAdminAuthenticated()) redirect("/admin");
  const params = await searchParams;

  return (
    <main className="admin-page admin-login-page">
      <form className="admin-login-card" action="/api/admin/login" method="post">
        <p className="eyebrow">ДЕТАЛЕКС</p>
        <h1>Вход в админку</h1>
        <label>Логин<input name="login" autoComplete="username" /></label>
        <label>Пароль<input name="password" type="password" autoComplete="current-password" /></label>
        <button type="submit">Войти</button>
        {params.error ? <p className="admin-warning">Неверный логин или пароль</p> : null}
      </form>
    </main>
  );
}