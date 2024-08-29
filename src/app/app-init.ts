import { ExpenseService } from '../app/services/expense.service';

export function initializeExpenseData(
  expenseService: ExpenseService
): () => Promise<void> {
  return () =>
    new Promise<void>((resolve) => {
      const dummyData = {
        name: 'John Doe',
        id: 'EMP001',
        designation: 'Software Engineer',
      };
      expenseService.setEmployeeData(dummyData);
      resolve(); // Resolve the promise to indicate completion
    });
}
