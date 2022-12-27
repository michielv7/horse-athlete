import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { ButtonHTMLAttributes } from 'react';

export const Button = ({
  text,
  isLoading,
  ...props
}: React.DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
  isLoading: boolean;
}) => (
  <button {...props} disabled={isLoading}>
    {!isLoading ? text : <ArrowPathIcon className="h-4 w-4 animate-spin" />}
  </button>
);
