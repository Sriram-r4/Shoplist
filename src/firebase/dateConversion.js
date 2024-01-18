// Convert server timestamp to date and get the day
export function getDayFromDateTimestamp(timestamp) {
    const date = timestamp.toDate(); // Convert server timestamp to Date object
    const day = date.getDate(); // Get the day of the month
    const month = date.toLocaleString('en-US', { month: 'long' }); // Get the month as text
    return month.substring(0,3)+" "+ day;
  }

  export function getDateFromTimestamp(timestamp) {
    const date = timestamp.toDate(); // Convert server timestamp to Date object
    const day = date.getDate(); // Get the day of the month
    const month = date.toLocaleString('en-US', { month: 'long' }); // Get the month as text
    const year=date.getFullYear();
    return  day+" "+month+" "+year ;
  }