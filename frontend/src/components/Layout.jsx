export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-startup text-white flex items-center justify-center">
      {children}
    </div>
  );
}