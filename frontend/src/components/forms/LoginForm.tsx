'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, PasswordInput } from '@/components/ui';
import { logger } from '@/lib/logger';
import { AxiosError } from 'axios';

type LoginFormData = {
  username: string;
  password: string;
};

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const t = useTranslations('auth');

  const loginSchema = useMemo(() => z.object({
    username: z.string().min(4, t('username_min_length')),
    password: z.string().min(8, t('password_min_length')),
  }), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      // Trim trailing spaces from username
      const trimmedData = {
        ...data,
        username: data.username.trimEnd(),
      };
      await login(trimmedData);
    } catch (err) {
      logger.error('Login failed', 'LoginForm', err);
      if (err instanceof AxiosError) {
        setError(err.response?.data?.error || t('login_error'));
      } else {
        setError(t('login_error'));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <Input
        id="username"
        type="text"
        label={t('username_label')}
        placeholder={t('username_placeholder')}
        error={errors.username?.message}
        {...register('username')}
      />

      <PasswordInput
        id="password"
        label={t('password_label')}
        placeholder={t('password_placeholder')}
        error={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        className="w-full"
        size="lg"
        isLoading={isSubmitting}
      >
        {isSubmitting ? t('logging_in') : t('login_button')}
      </Button>
    </form>
  );
}

