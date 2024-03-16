class Env {
  static SMTP_HOST: string = process.env.SMTP_HOST!;
  static SMTP_PORT: string = process.env.SMTP_PORT!;
  static SMTP_USER: string = process.env.SMTP_USER!;
  static SMTP_MASTER_PASSWORD: string = process.env.SMTP_MASTER_PASSWORD!;
  static SMTP_FROM: string = process.env.SMTP_FROM!;
  static NEXTAUTH_SECRET: string = process.env.NEXTAUTH_SECRET!;

  static APP_URL: string = process.env.NEXTAUTH_URL!;
}
export default Env;
