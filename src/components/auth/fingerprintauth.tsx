import { Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FingerprintAuthProps {
  onAuthenticated: () => void;
}

type AuthStatus = 'idle' | 'scanning' | 'success' | 'error';

export function FingerprintAuth({ onAuthenticated }: FingerprintAuthProps) {
  const [status, setStatus] = useState<AuthStatus>('idle');

  const handleScan = () => {
    if (status !== 'idle') return;

    setStatus('scanning');
    setTimeout(() => {
      // Simulate a successful scan
      setStatus('success');
      setTimeout(() => {
        onAuthenticated();
      }, 1000);
    }, 2500);
  };

  const statusText: { [key in AuthStatus]: string } = {
    idle: 'Place your finger to unlock',
    scanning: 'Scanning...',
    success: 'Access Granted',
    error: 'Access Denied',
  };

  const statusColor: { [key in AuthStatus]: string } = {
    idle: 'text-muted-foreground',
    scanning: 'text-primary',
    success: 'text-success-foreground',
    error: 'text-destructive-foreground',
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative flex cursor-pointer items-center justify-center"
          onClick={handleScan}
        >
          <Fingerprint
            className={cn(
              'z-10 h-48 w-48 text-foreground/20 transition-colors duration-300',
              status === 'scanning' && 'text-primary/40',
              status === 'success' && 'text-success/40'
            )}
            strokeWidth={1}
          />

          {status === 'scanning' && (
            <motion.div
              className="absolute z-20 h-1 w-full bg-primary/80"
              initial={{ y: 50 }}
              animate={{ y: -50 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          )}

          {status === 'success' && (
             <motion.div
              className="absolute z-20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <Fingerprint
                className="h-48 w-48 text-success"
                strokeWidth={1}
              />
            </motion.div>
          )}

        </motion.div>

        <motion.p
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn('text-xl font-medium', statusColor[status])}
        >
          {statusText[status]}
        </motion.p>
      </div>
    </div>
  );
}