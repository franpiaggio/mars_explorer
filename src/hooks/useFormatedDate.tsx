function useFormatedDate(date = new Date()) {
  const yyyy = date.getFullYear()
  let mm: string | number = date.getMonth() + 1
  let dd: string | number = date.getDate()
  const formattedToday = `${yyyy}-${mm}-${dd}`
  return formattedToday
}

function formatToAllowedDate(date: string) {
  const splitted = date.split("-")
  const yyyy = splitted[0]
  let mm = splitted[1]
  let dd = splitted[2]
  // The NASA API uses the day without 0
  // This code is a little bit odd but it solves the problem
  // loading default dates without the 0
  if (parseInt(dd) < 10) {
    dd = "0" + dd
  }
  return `${yyyy}-${mm}-${dd}`
}

export default useFormatedDate
export { formatToAllowedDate }
