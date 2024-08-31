export class AmountUtils {
    static formatAmount(amount: number): string {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
      }).format(amount);
    }
  }