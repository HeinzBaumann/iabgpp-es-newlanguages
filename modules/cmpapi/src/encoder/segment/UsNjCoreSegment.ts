import { AbstractBase64UrlEncoder } from "../base64/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../base64/CompressedBase64UrlEncoder.js";
import { BitStringEncoder } from "../bitstring/BitStringEncoder.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedIntegerList } from "../datatype/EncodableFixedIntegerList.js";
import { Predicate } from "../datatype/validate/Predicate.js";
import { DecodingError } from "../error/DecodingError.js";
import { ValidationError } from "../error/ValidationError.js";
import { EncodableBitStringFields } from "../field/EncodableBitStringFields.js";
import { USNJ_CORE_SEGMENT_FIELD_NAMES } from "../field/UsNjField.js";
import { UsNjField } from "../field/UsNjField.js";
import { UsNj } from "../section/UsNj.js";
import { AbstractLazilyEncodableSegment } from "./AbstractLazilyEncodableSegment.js";

export class UsNjCoreSegment extends AbstractLazilyEncodableSegment<EncodableBitStringFields> {
  private base64UrlEncoder: AbstractBase64UrlEncoder = CompressedBase64UrlEncoder.getInstance();
  private bitStringEncoder: BitStringEncoder = BitStringEncoder.getInstance();

  constructor(encodedString?: string) {
    super();
    if (encodedString) {
      this.decode(encodedString);
    }
  }

  // overriden
  public getFieldNames(): string[] {
    return USNJ_CORE_SEGMENT_FIELD_NAMES;
  }

  // overriden
  protected initializeFields(): EncodableBitStringFields {
    const nullableBooleanAsTwoBitIntegerValidator = new (class implements Predicate<number> {
      test(n: number): boolean {
        return n >= 0 && n <= 2;
      }
    })();

    const nonNullableBooleanAsTwoBitIntegerValidator = new (class implements Predicate<number> {
      test(n: number): boolean {
        return n >= 1 && n <= 2;
      }
    })();
    const nullableBooleanAsTwoBitIntegerListValidator = new (class implements Predicate<number[]> {
      test(l: number[]): boolean {
        for (let i = 0; i < l.length; i++) {
          let n = l[i];
          if (n < 0 || n > 2) {
            return false;
          }
        }
        return true;
      }
    })();

    let fields: EncodableBitStringFields = new EncodableBitStringFields();
    fields.put(UsNjField.VERSION.toString(), new EncodableFixedInteger(6, UsNj.VERSION));
    fields.put(
      UsNjField.PROCESSING_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsNjField.SALE_OPT_OUT_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsNjField.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsNjField.SALE_OPT_OUT.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsNjField.TARGETED_ADVERTISING_OPT_OUT.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsNjField.SENSITIVE_DATA_PROCESSING.toString(),
      new EncodableFixedIntegerList(2, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]).withValidator(
        nullableBooleanAsTwoBitIntegerListValidator
      )
    );
    fields.put(
      UsNjField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(),
      new EncodableFixedIntegerList(2, [0, 0, 0, 0, 0]).withValidator(nullableBooleanAsTwoBitIntegerListValidator)
    );
    fields.put(
      UsNjField.ADDITIONAL_DATA_PROCESSING_CONSENT.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsNjField.MSPA_COVERED_TRANSACTION.toString(),
      new EncodableFixedInteger(2, 1).withValidator(nonNullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsNjField.MSPA_OPT_OUT_OPTION_MODE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsNjField.MSPA_SERVICE_PROVIDER_MODE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    return fields;
  }

  // overriden
  protected encodeSegment(fields: EncodableBitStringFields): string {
    let bitString: string = this.bitStringEncoder.encode(fields, this.getFieldNames());
    let encodedString: string = this.base64UrlEncoder.encode(bitString);
    return encodedString;
  }

  // overriden
  protected decodeSegment(encodedString: string, fields: EncodableBitStringFields): void {
    if (encodedString == null || encodedString.length === 0) {
      this.fields.reset(fields);
    }
    try {
      let bitString: string = this.base64UrlEncoder.decode(encodedString);
      this.bitStringEncoder.decode(bitString, this.getFieldNames(), fields);
    } catch (e) {
      throw new DecodingError("Unable to decode UsNjCoreSegment '" + encodedString + "'");
    }
  }
}