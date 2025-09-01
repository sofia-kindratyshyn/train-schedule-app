export const formatDateForDB = (datetime: string) => {
    const date = new Date(datetime);
    const pad = (n: number, size = 2) => n.toString().padStart(size, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const microseconds = pad(date.getMilliseconds(), 6); // 6 знаків
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${microseconds}`;
  };