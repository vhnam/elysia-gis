import { Button, Link, Section, Tailwind, Text } from '@react-email/components';
import React from 'react';

import { env } from '@/config/env';

interface ResetPasswordEmailProps {
  token: string;
}

const ResetPasswordEmail = ({ token }: ResetPasswordEmailProps) => {
  const resetPasswordUrl = `${env.FRONTEND_URL}/auth/reset-password?token=${token}`;

  return (
    <Tailwind>
      <Section className="flex justify-center items-center w-full min-h-screen font-sans">
        <Section className="flex flex-col items-center w-80 rounded-b-2xl px-6 py-1 bg-gray-50 border-t-2 border-solid border-indigo-400">
          <Text className="font-semibold text-[24px] text-indigo-400 leading-[32px]">
            Reset your Password
          </Text>
          <Text className="text-gray-500">
            Tap the button below to reset your password account password. If you
            did not request a new password, you can safely delete this email.
          </Text>
          <Button
            className="box-border w-full rounded-[8px] bg-indigo-600 px-[12px] py-[12px] text-center font-semibold text-white"
            href={resetPasswordUrl}
          >
            Reset Password
          </Button>
          <Text className="text-gray-500">
            If that does not work, copy and paste the following link into your
            browser:
          </Text>
          <Link className="text-xs" href={resetPasswordUrl}>
            {resetPasswordUrl}
          </Link>
          <Text className="text-gray-500">Thank you for your attention.</Text>
          <Text className="text-indigo-400 text-sx font-semibold">
            The Elysian GIS Team
          </Text>
        </Section>
      </Section>
    </Tailwind>
  );
};

export default ResetPasswordEmail;
