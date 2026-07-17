import type { Metadata } from 'next';
import CategorizeClient from './CategorizeClient';

export const metadata: Metadata = {
   title: 'Categorize - Onreco',
};

export default function Page() {
   return <CategorizeClient />;
}
