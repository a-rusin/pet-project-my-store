function formatDate(createdAt) {
  const date = new Date(createdAt);
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 потому что getMonth() возвращает от 0 (январь) до 11 (декабрь)
  let year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export default formatDate;
