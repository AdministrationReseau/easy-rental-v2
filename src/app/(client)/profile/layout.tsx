

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col bg-primary-700 px-32">
        <div>
            <h1 className="text-2xl text-white font-bold mb-4">Profile</h1>
            <p className="text-white mb-8">Manage your profile settings and preferences.</p>
        </div>
      <main className="flex-1 p-8 max-w-full rounded-lg">{children}</main>
    </div>
  );
}