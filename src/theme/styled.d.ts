import 'styled-components';
import { DesignTokens } from './tokens';

declare module 'styled-components' {
  export interface DefaultTheme extends DesignTokens {}
}