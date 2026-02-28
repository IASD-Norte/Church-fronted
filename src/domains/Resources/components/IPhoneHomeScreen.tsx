import { IPhoneMockup } from './IPhoneMockup';
import { InstagramProfile } from './InstagramProfile';

/**
 * Vista del home screen de Instagram en iPhone
 */
export function IPhoneHomeScreen() {
  return (
    <IPhoneMockup>
      <InstagramProfile />
    </IPhoneMockup>
  );
}
