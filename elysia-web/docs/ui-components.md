# UI Components

This project uses [shadcn/ui](https://ui.shadcn.com) components built on top of [Base UI](https://base-ui.com) and styled with [Tailwind CSS](https://tailwindcss.com).

## Available Components

The following UI components are available in `src/components/ui/`:

- **Alert** (`alert.tsx`) - Alert messages
- **Alert Dialog** (`alert-dialog.tsx`) - Modal dialogs
- **Badge** (`badge.tsx`) - Status badges
- **Button** (`button.tsx`) - Button component
- **Card** (`card.tsx`) - Card container
- **Combobox** (`combobox.tsx`) - Autocomplete input
- **Dropdown Menu** (`dropdown-menu.tsx`) - Dropdown menus
- **Field** (`field.tsx`) - Form field wrapper
- **Input** (`input.tsx`) - Text input
- **Input Group** (`input-group.tsx`) - Input with icon/prefix
- **Label** (`label.tsx`) - Form label
- **Select** (`select.tsx`) - Select dropdown
- **Separator** (`separator.tsx`) - Visual separator
- **Textarea** (`textarea.tsx`) - Multi-line text input

## Adding New Components

To add a new shadcn/ui component:

1. Use the shadcn CLI:

```bash
pnpm dlx shadcn@latest add [component-name]
```

2. Or manually copy the component from [shadcn/ui](https://ui.shadcn.com)

Components will be added to `src/components/ui/` and can be imported:

```tsx
import { Button } from '@/components/ui/button';
```

## Styling

### Tailwind CSS

The project uses Tailwind CSS v4 with the `@tailwindcss/vite` plugin. Styles are configured in `src/styles.css`.

### Theme Configuration

The theme is configured in `components.json`:

- **Style**: `base-nova`
- **Base Color**: `neutral`
- **CSS Variables**: Enabled
- **Icon Library**: `lucide-react`

### Custom Styling

You can customize styles by:

1. Modifying `src/styles.css` for global styles
2. Using Tailwind utility classes directly in components
3. Extending the Tailwind config (if needed)

## Icons

Icons are provided by [Lucide React](https://lucide.dev):

```tsx
import { Lock, Mail, User } from 'lucide-react';

<User className="w-4 h-4" />;
```

## Toast Notifications

The project uses [Sonner](https://sonner.emilkowal.ski) for toast notifications:

```tsx
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
```

The `<Toaster /> component is included in the root layout (`src/routes/\_\_root.tsx`).

## Form Components

Forms use [TanStack Form](https://tanstack.com/form) for type-safe form handling:

```tsx
import { useForm } from '@tanstack/react-form';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

function MyForm() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      // Handle submission
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="email">
        {(field) => (
          <Field label="Email" error={field.state.meta.errors[0]}>
            <Input
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </Field>
        )}
      </form.Field>
      <Button type="submit">Submit</Button>
    </form>
  );
}
```
