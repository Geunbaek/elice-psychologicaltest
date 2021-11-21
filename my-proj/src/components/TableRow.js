const TableRow = ({title, contents}) => {
  const text = contents.reduce((acc, cur, idx)=> {
    if(idx === 0 || idx % 4 !== 0){
      return acc + ' ' + cur;
    } 
    return acc + '\n' + cur;
  },"")
  console.log(text)
  return (
    <>
      <div className="table-row">
        <div className="table-row-title">{title}</div>
        <div className="table-row-content">{text}</div>
      </div>
    </>
  );
}

export default TableRow;