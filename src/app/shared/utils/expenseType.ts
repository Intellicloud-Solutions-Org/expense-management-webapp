export class ExpenseUtils {
    // List of valid expense types
    static expenseTypes = [
      'Travel',
      'Bills',
      'Team Activities',
      'Professional Development'
    ];
  
    // Method to get the normalized expense type
    static getExpenseType(type: string): string | undefined {
      const normalizedType = type
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  
      return this.expenseTypes.find(expenseType => expenseType === normalizedType);
    }
  }