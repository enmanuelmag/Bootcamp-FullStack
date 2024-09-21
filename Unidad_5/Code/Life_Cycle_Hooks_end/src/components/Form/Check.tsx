type SwitchInputProps = {
  label: string;
  value: boolean;
  error?: string;
  className?: string;
  onChange: (value: boolean) => void;
};

const SwitchInput = (props: SwitchInputProps) => {
  const { label, value, error, onChange, className } = props;
  return (
    <div className={`flex flex-row justify-start ${className}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 block mx-3 w-4 h-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default SwitchInput;
