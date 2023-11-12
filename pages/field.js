export default function Field(props) {

  return (
    <>
      <form  id={`form_`+props.tablenameCount+"_"+(props.field_count+1)} >
        <td><input name={`fieldname`} className="form-control" /></td>
        <td><input name="showname" className="form-control" /></td>
        <td>
          <select name="migration_modelType" className="form-control" >
            <option value="string_text">文字</option>
            <option value="integer_number">數字</option>
            <option value="text_cheditor">文章</option>
          </select>
        </td>
        <td>
          <select name="isrequire" className="form-control" >
            <option value="0">否</option>
            <option value="1">是</option>
          </select>
        </td>
      </form>
    </>
  )
}
