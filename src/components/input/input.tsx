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
      className="p-4 rounded-md focus:outline-none valid:focus:ring-2 valid:focus:ring-green-500 required:focus:ring-2 required:focus:ring-red-500 peer text-black border"
      style={inputStyle}
      {...props}
    />
  );
}
