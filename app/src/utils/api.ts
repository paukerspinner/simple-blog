import axios from "axios"
import { IPostInputs, ISearchPostInputs } from "../constants/interface";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

export const getAllPost = async () : Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get('/post').then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  })
}

export const getPost = async (id: number) : Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get(`/post/${id}`).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  })
}

export const createPost = async (post: IPostInputs) : Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post('/post', post).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error)
    })
  })
}

export const updatePost = async (id: number, post: IPostInputs) => {
  return new Promise((resolve, reject) => {
    axios.patch(`/post/${id}`, post).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  })
}

export const deletePost = async (id: number) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/post/${id}`).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  })
}

export const searchPost = async (searchPostInputs: ISearchPostInputs): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`/post/search`, searchPostInputs).then(res => {
      resolve(res.data);
    }).catch(error => {
      reject(error);
    })
  })
}