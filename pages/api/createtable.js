import Collect from '../../lib/api/Collect';

export default async function create_table(req, res) {  
  try {    
    const json = await new Collect([],"/createtable").createTable(req.body);
    return res.json(json.data);
  } catch(e) {
    console.log(e) 
    return res.status(e.status || 422).json(e.response);
  }
}

