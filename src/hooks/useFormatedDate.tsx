// Receive a date and converts to the API format string
function useFormatedDate(date = new Date()) {
  const yyyy = date.getFullYear()
  let mm: string | number = date.getMonth() + 1
  let dd: string | number = date.getDate()
  const formattedToday = `${yyyy}-${mm}-${dd}`
  return formattedToday
}

// Receive a string and fix format errors
// The NASA API uses the day without 0
// This code is a little bit odd but it solves the problem
// Add the "0" when its necessary
function formatToAllowedDate(date: string) {
  const splitted = date.split("-")
  const yyyy = splitted[0]
  let mm = splitted[1]
  let dd = splitted[2]
  if (mm.length === 1) {
    mm = "0" + mm
  }
  if (dd.length === 1) {
    dd = "0" + dd
  }
  return `${yyyy}-${mm}-${dd}`
}

// Receive a string and respond a date to the Picker
function formatDateToPicker(day: string) {
  return new Date(formatToAllowedDate(day) + "T00:00:00")
}

export default useFormatedDate
export { formatToAllowedDate, formatDateToPicker }
