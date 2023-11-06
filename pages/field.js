export default function Field(props) {

  return (
    <>
      <form  id={`form_`+props.tablenameCount+"_"+props.field_count} >
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
      </form>
    </>
  )
}
