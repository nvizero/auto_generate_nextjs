import axios from "axios";

class BaseApi {
  constructor(accessToken, subPath) {
    this.config = {};
    if (accessToken) {
        this.config.headers = {
          authorization: `Bearer ${accessToken}`,
        };
    }
    //this.apiUrl = process.env.PORTFOLIO_API_URL + subPath;
    this.apiUrl = `${process.env.PRODUCT_API}` + subPath;
    this.apiAuthUrl = `${process.env.PRODUCT_API}${"api/auth"}` + subPath;
  }

  createTable(data){

    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return axios({
      method: "post",
      url: `${this.apiUrl}`,
      data: data,
      headers: headers,
    });    
  }

  submit(data) {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return axios({
      method: "post",
      url: `${this.apiUrl}`,
      data: data,
      headers: headers,
    });    

    // console.log("??",data,"1234")
    // return axios.post(`${this.apiUrl}`,data, this.config);
  }

  generate() {
    return axios({
      method: "post",
      url: `${this.apiUrl}`,
    });    
  }
  getById(id) {
    return axios.get(`${this.apiUrl}/${id}`);
  }

  getBySlug(slug) {
    return axios.get(`${this.apiUrl}/s/${slug}`);
  }

  create(data) {
    return axios.post(this.apiUrl, data, this.config);
  }

  register(data) {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return axios({
      method: "post",
      url: `${this.apiAuthUrl}`,
      data: data,
      headers: headers,
    });    
  }

  login(data) {    
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    return axios({
      method: "post",
      url: `${this.apiAuthUrl}`,
      data: data,
      headers: headers,
    });
  }

  logout(data) {    
    // let headers = {
    //   "Content-Type": "application/json",
    //   "Accept": "application/json",
    //   authorization: `Bearer ${accessToken}`,
    // };
    // console.log( 'headers' , this.apiAuthUrl , data , this.config.headers);
    return axios({
      method: "post",
      url: `${this.apiAuthUrl}`,      
      headers: this.config.headers,
    });
  }
}

export default BaseApi;
