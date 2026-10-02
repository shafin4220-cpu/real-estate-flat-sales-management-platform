/**
 * Bangladeshi Number, Currency & Date Formatters with full EN / বাংলা support
 */
import { Language } from '../types';

const banglaDigitsMap: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const monthMapBn: Record<string, string> = {
  Jan: 'জানু',
  Feb: 'ফেব্রু',
  Mar: 'মার্চ',
  Apr: 'এপ্রিল',
  May: 'মে',
  Jun: 'জুন',
  Jul: 'জুলাই',
  Aug: 'আগস্ট',
  Sep: 'সেপ্টে',
  Oct: 'অক্টো',
  Nov: 'নভে',
  Dec: 'ডিসে',
  January: 'জানুয়ারি',
  February: 'ফেব্রুয়ারি',
  March: 'মার্চ',
  April: 'এপ্রিল',
  June: 'জুন',
  July: 'জুলাই',
  August: 'আগস্ট',
  September: 'সেপ্টেম্বর',
  October: 'অক্টোবর',
  November: 'নভেম্বর',
  December: 'ডিসেম্বর',
};

export function toBanglaDigits(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return '';
  const str = String(val);
  return str.replace(/[0-9]/g, (digit) => banglaDigitsMap[digit] || digit);
}

export function formatBDT(
  amount: number | undefined | null,
  compact = false,
  lang: Language = 'en'
): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return lang === 'bn' ? '৳ ০' : '৳ 0';
  }

  const isBn = lang === 'bn';
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));

  if (compact) {
    if (absAmount >= 10000000) {
      const cr = (absAmount / 10000000).toFixed(2).replace(/\.00$/, '');
      if (isBn) {
        return `${isNegative ? '-' : ''}৳ ${toBanglaDigits(cr)} কোটি`;
      }
      return `${isNegative ? '-' : ''}৳ ${cr} Cr`;
    }
    if (absAmount >= 100000) {
      const lakh = (absAmount / 100000).toFixed(2).replace(/\.00$/, '');
      if (isBn) {
        return `${isNegative ? '-' : ''}৳ ${toBanglaDigits(lakh)} লাখ`;
      }
      return `${isNegative ? '-' : ''}৳ ${lakh} Lakh`;
    }
  }

  const str = absAmount.toString();
  let formatted = '';

  if (str.length <= 3) {
    formatted = str;
  } else {
    const lastThree = str.substring(str.length - 3);
    const rest = str.substring(0, str.length - 3);
    const restWithCommas = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    formatted = `${restWithCommas},${lastThree}`;
  }

  if (isBn) {
    return `${isNegative ? '-' : ''}৳ ${toBanglaDigits(formatted)}`;
  }
  return `${isNegative ? '-' : ''}৳ ${formatted}`;
}

export function formatDate(dateStr: string | undefined | null, lang: Language = 'en'): string {
  if (!dateStr) return '';
  if (lang !== 'bn') return dateStr;

  // Format like: "30 Sep 2026" or "10 Jun 2026, 04:00 PM"
  let result = dateStr;

  // Replace English month names with Bangla month names
  Object.keys(monthMapBn).forEach((enMonth) => {
    const regex = new RegExp(`\\b${enMonth}\\b`, 'g');
    result = result.replace(regex, monthMapBn[enMonth]);
  });

  // Convert digits to Bangla
  result = toBanglaDigits(result);

  // Replace AM/PM
  result = result.replace(/AM/gi, 'সকাল').replace(/PM/gi, 'বিকাল');

  return result;
}

export function formatSqFt(sqft: number, lang: Language = 'en'): string {
  if (lang === 'bn') {
    return `${toBanglaDigits(sqft.toLocaleString())} বর্গফুট`;
  }
  return `${sqft.toLocaleString()} sq ft`;
}

export function formatDaysLate(days: number, lang: Language = 'en'): string {
  if (lang === 'bn') {
    return `${toBanglaDigits(days)} দিন বকেয়া`;
  }
  return `${days}d late`;
}

export function maskPhone(phone: string, revealed = false): string {
  if (!phone) return '';
  if (revealed) return phone;
  // Format: 01712-345678 -> 01712-•••678 (keep as is in English digits per rule 4)
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length >= 11) {
    return `${clean.substring(0, 5)}-•••${clean.substring(clean.length - 3)}`;
  }
  return phone.replace(/(\d{3})\d+(\d{2})/, '$1••••$2');
}

export function maskNID(nid: string, revealed = false): string {
  if (!nid) return '';
  if (revealed) return nid;
  if (nid.length <= 6) return '••••••';
  return `${nid.substring(0, 4)}••••••••${nid.substring(nid.length - 4)}`;
}

export function getTimeRemaining(
  expiresAtIso: string,
  lang: Language = 'en'
): {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
  formatted: string;
} {
  const expiry = new Date(expiresAtIso).getTime();
  const now = Date.now();
  const diff = expiry - now;

  if (diff <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
      formatted: lang === 'bn' ? 'মেয়াদ শেষ' : 'Expired',
    };
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const formatted =
    lang === 'bn'
      ? `${toBanglaDigits(hours)}ঘণ্টা ${toBanglaDigits(minutes)}মি. বাকি`
      : `${hours}h ${minutes}m left`;

  return { hours, minutes, seconds, expired: false, formatted };
}
