import req from '../utils/request';
//import qs from 'querystring'

export function fetch(searchParsms) {
  //return req.get(`/pms/Project/ListAll?name=&status=-10&beginDate=2017-11-01T00%3A00%3A00&endDate=2018-12-31T00%3A00%3A00&page=${page}&start=0&limit=50`);
  return req.get('/pms/Project/ListAll', searchParsms);  
}
export function search(searchParsms) {
  return req.get('/pms/Project/ListAll', searchParsms);
}

export function GetMailList(){
  return req.get(`/pms/MailList/GetMailListByQuery?query=&page=1&start=0&limit=25`);
}
export function getOneProject(id){
  return req.get('/pms/Project/GetOne', {id});
}

export function create(values){
  return req.post('/pms/Project/CreateProject',values); 
}
