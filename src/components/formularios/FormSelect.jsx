export const FormSelect = ({
  labelText,
  props,
  type,
  placeholder,
  children,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold text-sn text-gray-700">{labelText}</label>
      <select
        {...props}
        type={type}
        placeholder={placeholder}
        className="border capitalize border-[#E2E8F0] bg-[#F7FAFC] py-[0.90rem] px-[0.75rem] focus:border-violet-500 rounded-none outline-none outline-[1px] text-sm font-semibold"
      >
        {children}
      </select>
    </div>
  );
};
