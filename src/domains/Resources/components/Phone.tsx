import { Button } from '@/core/components/ui/button';
import { useState } from 'react';
import { IPhoneHomeScreen } from './IPhoneHomeScreen';
import { IPhoneReels } from './IPhoneReels';

export default function Phone() {
  const [currentView, setCurrentView] = useState<'home' | 'app'>('home');

  return (
    <div className="h-full w-40 flex flex-col space-y-1 items-center">
      <div className="flex">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-1 flex gap-1 border border-gray-200 dark:border-gray-700 shadow-lg">
          <Button
            variant={currentView === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('home')}
            className="rounded-full"
          >
            Instagram
          </Button>
          <Button
            variant={currentView === 'app' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentView('app')}
            className="rounded-full"
          >
            Reels
          </Button>
        </div>
      </div>

      {currentView === 'home' && <IPhoneHomeScreen />}
      {currentView === 'app' && <IPhoneReels />}
    </div>
  );
}

