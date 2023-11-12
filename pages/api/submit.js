import Collect from '../../lib/api/Collect';

export default async function submit(req, res) {  
  try {    
    const json = await new Collect([],"/submit").submit(req.body);
    return res.json(json.data);
    
  } catch(e) {
    console.log(e) 
    return res.status(e.status || 422).json(e.response);
  }
}

