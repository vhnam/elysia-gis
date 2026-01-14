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

type PasswordInputProps = Omit<ComponentProps<'input'>, 'type'>;

const PasswordInput = ({ ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Enter password"
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <Tooltip>
          <TooltipTrigger
            render={
              <InputGroupButton
                variant="ghost"
                aria-label="Info"
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
