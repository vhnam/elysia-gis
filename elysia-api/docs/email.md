# Email Configuration

The API uses React Email for templating and Nodemailer for sending emails. Email functionality is primarily used for password reset flows.

## Setup

Configure your email service in the `.env` file:

```env
EMAIL_HOST=smtp.example.com
EMAIL_PORT=465
EMAIL_USERNAME=your-email@example.com
EMAIL_PASSWORD=your-email-password
FRONTEND_URL=http://localhost:3000
```

## Email Service Providers

### Gmail

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465  # SSL
# or
EMAIL_PORT=587  # TLS
```

**Note:** For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### SendGrid

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USERNAME=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
```

### Mailgun

```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USERNAME=your_mailgun_username
EMAIL_PASSWORD=your_mailgun_password
```

## Email Templates

Email templates are located in `src/emails/` and use React components.

### Preview Templates

Preview email templates locally:

```bash
pnpm email
```

This starts a local email preview server at `http://localhost:4100` where you can view and test email templates.

### Creating New Templates

1. Create a new React component in `src/emails/`
2. Use React Email components from `@react-email/components`
3. Import and render in your service code:

```tsx
import { render } from '@react-email/render';
import YourEmailTemplate from '@/emails/your-template';

const html = await render(YourEmailTemplate({ props }));
```

## Troubleshooting

### Email Not Sending

1. Verify SMTP credentials in `.env`
2. Check firewall/network settings for SMTP port
3. For Gmail, ensure you're using an App Password
4. Check server logs for detailed error messages
5. Verify `FRONTEND_URL` is correctly set for email links

