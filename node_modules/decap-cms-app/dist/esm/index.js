import { DecapCmsCore as CMS } from 'decap-cms-core';
import './extensions.js';

// Log version
if (typeof window !== 'undefined') {
  if (typeof "3.12.2" === 'string') {
    console.log(`decap-cms-app ${"3.12.2"}`);
  }
}
export const DecapCmsApp = {
  ...CMS
};
export default CMS;