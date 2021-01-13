export default function Button({ className, ...props }) {
  return <button {...props} className={`py-2 px-4 bg-gray-500 border text-white font-semibold rounded-lg ${className}`} />;
}
