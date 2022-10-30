function useFormatedDate(date = new Date()) {
  const baseDate = date
  const yyyy = baseDate.getFullYear()
  let mm: string | number = baseDate.getMonth() + 1
  let dd: string | number = baseDate.getDate()
  const formattedToday = `${yyyy}-${mm}-${dd}`
  return formattedToday
}

export default useFormatedDate
