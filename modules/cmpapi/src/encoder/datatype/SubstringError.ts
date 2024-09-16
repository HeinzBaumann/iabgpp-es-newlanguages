import { DecodingError } from "../error/DecodingError.js";

/**
 * class for decoding errors
 *
 * @extends {DecodingError}
 */
class SubstringError extends DecodingError {
  /**
   * constructor - constructs an DecodingError
   *
   * @param {string} msg - Decoding Error Message
   * @return {undefined}
   */
  public constructor(msg: string) {
    super(msg);
    this.name = "SubstringError";
  }
}

export { SubstringError };