'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginFormData, loginSchema } from '@/lib/schemas/auth';
import { Button } from '@/components/ui/button';
import { TextDivider } from '@/components/ui/text-divider';
import { Form, FormField } from '@/components/ui/form';
import { FormInputField } from '@/components/ui/form-input';
import { LineIcon } from '@/components/icons/service-icons';

const Login = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormData) => {
    console.log(values);
  };

  return (
    <div className="flex h-full flex-col gap-10 px-5 pt-6">
      <div>
        <h1 className="text-primary text-2xl font-extrabold">hitode</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col justify-between gap-4 py-6"
        >
          <div className="space-y-10">
            <h3 className="text-foreground text-2xl font-bold">ログイン</h3>
            <div>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormInputField
                      label="メールアドレス"
                      required
                      inputProps={{
                        placeholder: 'yamada_taro@email.co.jp',
                        ...field,
                      }}
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormInputField
                      type="password"
                      label="パスワード"
                      required
                      inputProps={{
                        placeholder: 'パスワードを入力',
                        showToggle: false,
                        ...field,
                      }}
                    />
                  )}
                />
              </div>

              <div className="mt-4 text-right">
                <button
                  type="button"
                  className="text-primary cursor-pointer text-sm font-bold"
                >
                  パスワードを忘れましたか？
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Button
                type="submit"
                className="h-13 w-full rounded-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                ログイン
              </Button>

              <Button
                type="button"
                variant="outline"
                className="h-13 w-full rounded-full whitespace-normal"
              >
                アカウントをお持ちでない方は新規登録
              </Button>
            </div>

            <TextDivider>または</TextDivider>

            <Button
              type="button"
              className="h-13 w-full rounded-full bg-[#00B900] text-white hover:bg-[#00B900]/80 disabled:opacity-50"
            >
              <LineIcon />
              LINEでログイン
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
