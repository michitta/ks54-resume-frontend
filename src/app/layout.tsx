import UniversalProvider from '@/components/universal.context'
import '../styles/globals.scss'
import { Manrope } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata = {
  title: 'Редактор резюме КС54',
  description: 'Панель для создания и редактиврования резюме',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={manrope.className}>
        <UniversalProvider>
          <Toaster />
          {children}
        </UniversalProvider>
      </body>
    </html>
  )
}
