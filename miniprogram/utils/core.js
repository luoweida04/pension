export const formatter = (time) => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = ("0" + (date.getMonth() + 1)).slice(-2)
  let sdate = ("0" + date.getDate()).slice(-2)
  let temp = `${year}-${month}-${sdate}`
  return temp;
}