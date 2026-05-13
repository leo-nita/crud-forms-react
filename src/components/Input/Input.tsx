type BaseProps = {
  textArea?: boolean;
  label: string;
  type?: string;
};

type InputElementProps = BaseProps & {
  textArea?: false;
  ref?: React.Ref<HTMLInputElement>;
};

type TextAreaProps = BaseProps & {
  textArea: true;
  ref?: React.Ref<HTMLTextAreaElement>;
};

type InputProps = InputElementProps | TextAreaProps;
export default function Input({ textArea, label, ref, ...props }: InputProps) {
  const classes =
    'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600  focus:outline-none focus:border-stone-600';
  const id = label.toLowerCase().replace(/\s/g, '-');
  return (
    <p className="flex flex-col gap-1 my-4">
      <label
        htmlFor={id}
        className="text-sm font-bold uppercase text-stone-500"
        id={label}
      >
        {label}
      </label>
      {textArea ? (
        <textarea
          data-testid={label}
          ref={ref}
          className={classes}
          {...props}
        />
      ) : (
        <input data-testid={label} ref={ref} {...props} className={classes} />
      )}
    </p>
  );
}
