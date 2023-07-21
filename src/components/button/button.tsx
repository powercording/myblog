'use client';

type ButtonProps<T extends React.ElementType> = {
  as?: T;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as'>;

export default function Button<C extends React.ElementType>({ as, ...props }: ButtonProps<C>) {
  const { style } = props;
  const Component = as || 'button';

  return (
    <Component
      {...props}
      type={props.type ?? 'button'}
      className="bg-blue-200 p-2 rounded-md text-gray-400 peer-valid:text-white peer-valid:bg-blue-400 peer-valid:hover:bg-blue-500"
      style={style}
    />
  );
}
