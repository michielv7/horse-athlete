import '#/styles/globals.css';
import AddressBar from '#/ui/AddressBar';
import GlobalNav from './GlobalNav';

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <body className="bg-E5E5E5 overflow-y-scroll pt-0">
        <div className="grid grid-cols-[200px,calc(98%-200px)] gap-x-2">
          <div className="sidebar fixed top-0 bottom-0 col-start-1 w-[200px] overflow-y-auto bg-gray-900 p-2 lg:left-0">
            <GlobalNav />
          </div>

          <div className="col-start-2 mt-4 space-y-4">
            <AddressBar />
            <div className="rounded-xl border border-gray-800 bg-black p-8 text-white">
              {children}
            </div>
          </div>

          <div className="col-start-2 col-end-2 mt-28 flex items-center justify-center">
            <div className="text-sm text-gray-600 underline decoration-dotted underline-offset-4">
              This website is in development
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
