export default function Field(props) {

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 阻止表单默认提交行为
    // 在这里处理表单提交逻辑，可以访问formData中的数据
  };
  return (
    <>
      <form onSubmit={handleFormSubmit} id={`form`+props.count}>
          <thead>
            <tr>
              <td>欄位</td>
              <td>顯示名稱</td>
              <td>資料庫型別/表單輸入類型</td>
              <td>必填</td>
            </tr>
          </thead>
        <tr>
          <td><input name={`fieldname`} className="form-control" /></td>
          <td><input name="showname" className="form-control" /></td>
          <td>
            <select name="migration_modelType" className="form-control" >
              <option value="string|text">文字</option>
              <option value="integer|number">數字</option>
              <option value="text|cheditor">文章</option>
            </select>
          </td>
          <td>
            <select name="isrequire" className="form-control" >
              <option value="0">否</option>
              <option value="1">是</option>
            </select>
          </td>
        </tr>
      </form>
    </>
  )
}
