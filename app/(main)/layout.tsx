import '@/app/globals.css'

export const metadata = {
  title: 'Super Termo',
  description: 'Jogo de Palavras',
}

function RootLayout({children}:{children:React.ReactNode}) {
  return ( 
    <div className="p-2">
      {children}
    </div>
   );
}

export default RootLayout;