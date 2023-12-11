import '@/app/globals.css'

export const metadata = {
  title: 'Super Termo',
  description: 'Jogo de Palavras',
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='pt-br'>
      <body>
        <div className="p-2">
          {children}
        </div>
      </body>
    </html>

  );
}

export default RootLayout;