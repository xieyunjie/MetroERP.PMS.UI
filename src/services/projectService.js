import req from '../utils/request';
//import qs from 'querystring'
//const pmsUrl = process.env.pmsurl;

const pmsUrl = process.env.PMSURL_ENV;
export function fetch(searchParsms) { 
  return req.get(`${pmsUrl}/Project/ListAll`, searchParsms);  
}
export function search(searchParsms) {  
  return req.get(`${pmsUrl}/Project/ListAll`, searchParsms);
}

export function GetMailList(){
  return req.get(`${pmsUrl}/MailList/GetMailListByQuery?query=&page=1&start=0&limit=25`);
}
export function getOneProject(id){
  return req.get(`${pmsUrl}/Project/GetOne`, {id});
}

export function create(values){
  return req.post(`${pmsUrl}/Project/CreateProject`,values); 
}
export function update(values){
  return req.post(`${pmsUrl}/Project/ModifyProject`,values); 
}

