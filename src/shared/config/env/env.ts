import 'server-only';

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Не задана переменная окружения ${name}`);
  }

  return value.replace(/\/$/, '');
}

export const API_URL = requireEnv('API_URL');
