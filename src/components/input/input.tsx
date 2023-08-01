import { CSSProperties } from 'react';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'style'> {
  style?: CSSProperties;
  as?: 'textarea';
}

export default function Input({ as, ...props }: InputProps) {
  const { style } = props;
  const inputStyle = style || {};
  return (
    <input
      className="peer rounded-md border p-4 text-black focus:outline-none required:focus:ring-2 required:focus:ring-red-500 valid:focus:ring-2 valid:focus:ring-green-500"
      style={inputStyle}
      {...props}
    />
  );
}
