import type { Metadata } from 'next';
import ReconcileClient from './ReconcileClient';

export const metadata: Metadata = {
   title: 'Reconciliation - Onreco',
};

export default function Page() {
   return <ReconcileClient />;
}
