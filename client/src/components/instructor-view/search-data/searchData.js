export const searchData = (search) => {
    filter((item)=>{
    return search.toLowerCase() ==='' 
    ? item
    : Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  })}