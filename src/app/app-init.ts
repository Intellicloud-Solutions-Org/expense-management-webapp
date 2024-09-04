import { ExpenseService } from '../app/services/expense.service';
import { UserService } from '../app/services/user.service';



interface EmployeeData {
  name: string;
  id: string;
  designation: string;
}

interface UserData {
  companyName: string;
  designation: string;
  userName: string;
  email: string;
}


export function initializeExpenseData(
  expenseService: ExpenseService
): () => Promise<void> {
  return () =>
    new Promise<void>((resolve) => {
      const dummyData: EmployeeData = {
        name: 'John Doe',
        id: 'EMP001',
        designation: 'Software Engineer',
      };
      expenseService.setEmployeeData(dummyData);
      resolve(); 
    });
}

export function initializeUserData(
  userService: UserService
): () => Promise<void> {
  return () =>
    new Promise<void>((resolve) => {
      const dummyData: UserData = {
        companyName: 'Acme Corp',
        designation: 'Senior Developer',
        userName: 'johndoe',
        email: 'johndoe@acme.com',
      };
      userService.setUserData(dummyData);
      resolve(); 
    });
}


/*
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


export function initializeUserData(
    userService: UserService
  ): () => Promise<void> {
    return () =>
      new Promise<void>((resolve) => {
        const dummyData = {
          companyName: 'Acme Corp',
          designation: 'Senior Developer',
          userName: 'johndoe',
          email: 'johndoe@acme.com'
        };
        userService.setUserData(dummyData);
        resolve(); // Resolve the promise to indicate completion
      });
  }
      */