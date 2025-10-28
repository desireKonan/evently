// // Types pour les options de formatage
// type Locale = string;
// type Currency = string;
// type Unit = string;
// type UnitDisplay = 'long' | 'short' | 'narrow';
// type Notation = 'standard' | 'scientific' | 'engineering' | 'compact';
// type CompactDisplay = 'long' | 'short';
// type CurrencyDisplay = 'symbol' | 'code' | 'name';

// interface NumberFormatOptions {
//   locale?: Locale;
//   style?: 'decimal' | 'currency' | 'percent' | 'unit';
//   currency?: Currency;
//   currencyDisplay?: CurrencyDisplay;
//   unit?: Unit;
//   unitDisplay?: UnitDisplay;
//   minimumIntegerDigits?: number;
//   minimumFractionDigits?: number;
//   maximumFractionDigits?: number;
//   minimumSignificantDigits?: number;
//   maximumSignificantDigits?: number;
//   useGrouping?: boolean;
//   notation?: Notation;
//   compactDisplay?: CompactDisplay;
// }

// interface FormatterConfig extends NumberFormatOptions {
//   locale: Locale;
//   currency: Currency;
// }

// interface ParseResult {
//   success: boolean;
//   value: number | null;
//   error?: string;
// }

// // Types pour les fonctions utilitaires
// interface HumanReadableOptions {
//   decimals?: number;
//   forceUnit?: 'auto' | 'k' | 'M' | 'B' | 'T';
// }

// interface FileSizeOptions {
//   decimals?: number;
//   base?: 1000 | 1024;
// }

// interface DurationOptions {
//   showMilliseconds?: boolean;
//   compact?: boolean;
// }