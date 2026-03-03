import 'dotenv/config';

type NodeEnv = 'development' | 'test' | 'production';

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (!value && fallback === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? fallback!;
}

export const config = {
  nodeEnv: (getEnv('NODE_ENV', 'development') as NodeEnv),
  port: Number(getEnv('PORT', '3000')),
  logging: {
    level: getEnv('LOG_LEVEL', 'info')
  },
  firebase: {
    projectId: getEnv('FIREBASE_PROJECT_ID', 'demo-project'),
    clientEmail: getEnv('FIREBASE_CLIENT_EMAIL', 'demo@example.com'),
    privateKey: getEnv('FIREBASE_PRIVATE_KEY', 'demo-key')
  }
};