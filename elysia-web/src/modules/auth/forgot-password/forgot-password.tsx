import { Link } from '@tanstack/react-router';

import { useForgotPassword } from './forgot-password.actions';
import { cn } from '@/utils/ui';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';


export const ForgotPasswordForm = () => {
  const { form, isSuccess } = useForgotPassword();

  if (isSuccess) {
    return (
      <div className={cn('flex flex-col gap-6')}>
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            If an account with this email exists, you will receive an email with
            a link to reset your password.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-6')}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Forgot your password? No problem. Please enter your email and we
            will send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="email">
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
              <Field>
                <Button type="submit" disabled={form.state.isSubmitting}>
                  {form.state.isSubmitting ? 'Sending email...' : 'Confirm'}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        Remember your password? <Link to="/auth/login">Login</Link>
      </FieldDescription>
    </div>
  );
};
