

const Main = () => {
  return (
    <div className="flex ites-center justify-center w-full h-full">
    <h1 className="bg-red-500" > 홈 페이지 </h1>
      <table border={'solid'}>
      <thead>
        <tr>
        <th ><link to='/a' /> 번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <td>1</td>
        <td>게시글1</td>
        <td>1</td>
        <td>1</td>
      </tbody>
    </table>
    </div>
   

  )
}


export default Main