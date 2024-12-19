export enum UsIaField {
  VERSION = "Version",
  PROCESSING_NOTICE = "ProcessingNotice",
  SALE_OPT_OUT_NOTICE = "SaleOptOutNotice",
  TARGETED_ADVERTISING_OPT_OUT_NOTICE = "TargetedAdvertisingOptOutNotice",
  SENSITIVE_DATA_OPT_OUT_NOTICE = "SensitiveDataOptOutNotice",
  SALE_OPT_OUT = "SaleOptOut",
  TARGETED_ADVERTISING_OPT_OUT = "TargetedAdvertisingOptOut",
  SENSITIVE_DATA_PROCESSING = "SensitiveDataProcessing",
  KNOWN_CHILD_SENSITIVE_DATA_CONSENTS = "KnownChildSensitiveDataConsents",
  MSPA_COVERED_TRANSACTION = "MspaCoveredTransaction",
  MSPA_OPT_OUT_OPTION_MODE = "MspaOptOutOptionMode",
  MSPA_SERVICE_PROVIDER_MODE = "MspaServiceProviderMode",

  GPC_SEGMENT_TYPE = "GpcSegmentType",
  GPC_SEGMENT_INCLUDED = "GpcSegmentIncluded",
  GPC = "Gpc",
}

export const USIA_CORE_SEGMENT_FIELD_NAMES = [
  UsIaField.VERSION,
  UsIaField.PROCESSING_NOTICE,
  UsIaField.SALE_OPT_OUT_NOTICE,
  UsIaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE,
  UsIaField.SENSITIVE_DATA_OPT_OUT_NOTICE,
  UsIaField.SALE_OPT_OUT,
  UsIaField.TARGETED_ADVERTISING_OPT_OUT,
  UsIaField.SENSITIVE_DATA_PROCESSING,
  UsIaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS,
  UsIaField.MSPA_COVERED_TRANSACTION,
  UsIaField.MSPA_OPT_OUT_OPTION_MODE,
  UsIaField.MSPA_SERVICE_PROVIDER_MODE,
];

export const USIA_GPC_SEGMENT_FIELD_NAMES = [UsIaField.GPC_SEGMENT_TYPE, UsIaField.GPC];