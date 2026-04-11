
import type { Metadata } from 'next';

import { Card, CardContent } from '@/components/ui/card';

import { ForgotPasswordForm } from './_components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Sent a reset password otp to your email address',
};

export default function ForgotPasswordPage() {
  return (
    <div className='space-y-6'>
      {/* Brand */}
      <div className='text-center'>
        <div className='mx-auto mb-4 flex size-14 items-center justify-center rounded-xl bg-primary'>
          <svg
            viewBox='0 0 24 24'
            className='h-7 w-7 text-white'
            fill='currentColor'
          >
            <path
              d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            />
          </svg>
        </div>
        <h1 className='text-2xl font-bold text-white'>Admin Dashboard</h1>
        <p className='mt-1 text-sm text-slate-400'>Forgot password</p>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
