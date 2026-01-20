import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useState } from 'react';
import type { ComponentProps } from 'react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from './input-group';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface PasswordInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  autoComplete?: string;
}

const PasswordInput = ({
  autoComplete = 'current-password',
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Enter password…"
        type={showPassword ? 'text' : 'password'}
        spellCheck={false}
        autoComplete={autoComplete}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger
            render={
              <InputGroupButton
                variant="ghost"
                aria-label="Toggle password visibility"
                size="icon-xs"
                onClick={handleShowPassword}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </InputGroupButton>
            }
          />
          <TooltipContent>
            <p>{showPassword ? 'Hide password' : 'Show password'}</p>
          </TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  );
};

export default PasswordInput;
