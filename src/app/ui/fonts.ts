import { Inter } from 'next/font/google';
import { Lusitana } from 'next/font/google';
import { Rubik } from 'next/font/google';

const rubik = Rubik({
    subsets: ['latin'],
    variable: '--font-rubik',
})

const inter = Inter({ subsets: ['latin'] });

const lusitana = Lusitana({ weight: "700", subsets: ['latin'] });

export const fonts = {
    inter,
    lusitana,
    rubik,
}