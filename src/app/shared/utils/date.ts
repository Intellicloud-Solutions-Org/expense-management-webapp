export class DateUtils {

    // Formats the date as 'MMM d, y'
    static formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      };
      return date.toLocaleDateString('en-US', options);
    }

}
