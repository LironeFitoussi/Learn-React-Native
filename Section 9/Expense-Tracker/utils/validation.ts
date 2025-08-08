// Validation helper functions for form inputs

export type ValidationResult = {
  isValid: boolean;
  errorMessage: string;
};

/**
 * Validates amount input field
 * @param value - The amount value as string
 * @returns ValidationResult object with isValid flag and error message
 */
export function validateAmount(value: string): ValidationResult {
  if (!value || value.trim() === "") {
    return { isValid: false, errorMessage: "Amount is required" };
  }
  
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    return { isValid: false, errorMessage: "Please enter a valid number" };
  }
  
  if (numericValue <= 0) {
    return { isValid: false, errorMessage: "Amount must be greater than 0" };
  }
  
  if (numericValue > 999999) {
    return { isValid: false, errorMessage: "Amount is too large (max: 999,999)" };
  }

  // Check for too many decimal places
  const decimalPlaces = (value.split('.')[1] || '').length;
  if (decimalPlaces > 2) {
    return { isValid: false, errorMessage: "Amount can have maximum 2 decimal places" };
  }
  
  return { isValid: true, errorMessage: "" };
}

/**
 * Validates date input field
 * @param date - The date value as Date object
 * @returns ValidationResult object with isValid flag and error message
 */
export function validateDate(date: Date): ValidationResult {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return { isValid: false, errorMessage: "Please select a valid date" };
  }
  
  const today = new Date();
  if (date > today) {
    return { isValid: false, errorMessage: "Date cannot be in the future" };
  }
  
  // Check if date is too far in the past (e.g., more than 10 years)
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(today.getFullYear() - 10);
  if (date < tenYearsAgo) {
    return { isValid: false, errorMessage: "Date is too far in the past" };
  }
  
  return { isValid: true, errorMessage: "" };
}

/**
 * Validates description input field
 * @param value - The description value as string
 * @returns ValidationResult object with isValid flag and error message
 */
export function validateDescription(value: string): ValidationResult {
  const trimmedValue = value.trim();
  
  if (!trimmedValue) {
    return { isValid: false, errorMessage: "Description is required" };
  }
  
  if (trimmedValue.length < 3) {
    return { isValid: false, errorMessage: "Description must be at least 3 characters" };
  }
  
  if (trimmedValue.length > 100) {
    return { isValid: false, errorMessage: "Description is too long (max 100 characters)" };
  }
  
  return { isValid: true, errorMessage: "" };
}

/**
 * Validates all expense form fields at once
 * @param amount - Amount value as string
 * @param date - Date value as Date object
 * @param description - Description value as string
 * @returns Object with validation results for each field
 */
export function validateExpenseForm(amount: string, date: Date, description: string) {
  return {
    amount: validateAmount(amount),
    date: validateDate(date),
    description: validateDescription(description),
  };
}

/**
 * Real-time validation for amount field (less strict for better UX)
 * @param value - The amount value as string
 * @returns ValidationResult object with isValid flag and error message
 */
export function validateAmountRealTime(value: string): ValidationResult {
  if (!value || value.trim() === "") {
    return { isValid: true, errorMessage: "" }; // Don't show error for empty field in real-time
  }
  
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    return { isValid: false, errorMessage: "Please enter a valid number" };
  }
  
  if (numericValue <= 0) {
    return { isValid: false, errorMessage: "Amount must be greater than 0" };
  }
  
  if (numericValue > 999999) {
    return { isValid: false, errorMessage: "Amount is too large" };
  }
  
  return { isValid: true, errorMessage: "" };
}

/**
 * Real-time validation for description field (less strict for better UX)
 * @param value - The description value as string
 * @returns ValidationResult object with isValid flag and error message
 */
export function validateDescriptionRealTime(value: string): ValidationResult {
  const trimmedValue = value.trim();
  
  if (!trimmedValue) {
    return { isValid: true, errorMessage: "" }; // Don't show error for empty field in real-time
  }
  
  if (trimmedValue.length < 3) {
    return { isValid: false, errorMessage: "Description must be at least 3 characters" };
  }
  
  if (trimmedValue.length > 100) {
    return { isValid: false, errorMessage: "Description is too long (max 100 characters)" };
  }
  
  return { isValid: true, errorMessage: "" };
}