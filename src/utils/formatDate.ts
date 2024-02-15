export function formatDate(dateString: string) {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  // Если это сегодня, получаем время
  if (inputDate.toDateString() === currentDate.toDateString()) {
    const hours = inputDate.getHours().toString().padStart(2, '0');
    const minutes = inputDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Если это вчера, возвращаем "вчера"
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  if (inputDate.toDateString() === yesterday.toDateString()) {
    return 'вчера';
  }

  // Если это позавчера, возвращаем день недели
  const daysOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  const dayOfWeek = daysOfWeek[inputDate.getDay()];
  if (inputDate < yesterday) {
    return dayOfWeek;
  }

  // Возвращаем дату в формате 14/02/2024
  const formattedDate =
    `${inputDate.getDate().toString().padStart(2, '0')}/` +
    `${(inputDate.getMonth() + 1).toString().padStart(2, '0')}/` +
    `${inputDate.getFullYear()}`;
  return formattedDate;
}