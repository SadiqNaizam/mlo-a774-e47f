import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FaceAuthProps {
  onAuthenticated: () => void;
}

type AuthStatus = 'idle' | 'scanning' | 'success' | 'error';

export function FaceAuth({ onAuthenticated }: FaceAuthProps) {
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
    idle: 'Position your face for scanning',
    scanning: 'Scanning... Verifying identity...',
    success: 'Identity Verified',
    error: 'Recognition Failed',
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
          {/* Base User Icon */}
          <User
            className={cn(
              'z-10 h-48 w-48 text-foreground/20 transition-colors duration-300',
              status === 'scanning' && 'text-primary/40',
              status === 'success' && 'text-success/40'
            )}
            strokeWidth={1}
          />

          {/* Scanning Animation */}
          {status === 'scanning' && (
            <motion.div
              className="absolute z-0 h-64 w-64 rounded-full border-2 border-primary/80"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Success Animation */}
          {status === 'success' && (
             <motion.div
              className="absolute z-20 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <User
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