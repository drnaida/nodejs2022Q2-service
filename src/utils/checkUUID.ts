import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';

function checkThatThisIsUUID4(id: string) {
  return uuidValidate(id) && uuidVersion(id) === 4;
}

export { checkThatThisIsUUID4 };
