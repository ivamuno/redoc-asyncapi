import { TryItOutAuthStorerApiKeyItemValue, TryItOutAuthStorerBasicAuthItemValue } from './TryItOutAuthStorer'
import { SecurityScheme } from '../../../services/models/SecurityRequirement';

export interface TryItOutAuthProps {
  scheme: SecurityScheme;
  state?: TryItOutAuthStorerBasicAuthItemValue | TryItOutAuthStorerApiKeyItemValue;
  onCloseAuthorization: () => void;
}
