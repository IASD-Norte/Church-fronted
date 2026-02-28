import { IPhoneMockup } from './IPhoneMockup';
import { InstagramReelDemo } from './InstagramReelDemo';

/**
 * Vista de Reels de Instagram en iPhone
 */
export function IPhoneReels() {
  return (
    <IPhoneMockup showHomeIndicator={false}>
      <InstagramReelDemo />
    </IPhoneMockup>
  );
}
