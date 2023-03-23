import AddPost from "../components/post/add-post";
import EditPost from "../components/post/edit-post";
import ListPost from "../components/post/list-post";
import ShowPost from "../components/post/show-post";

export const HOME_PATH = '/';
export const SHOW_POST_PATH = '/post/:id';
export const CREATE_POST_PATH = '/post/create';
export const EDIT_POST_PATH = '/post/:id/edit';

export interface IRoute {
  name: string;
  path: string;
  element: JSX.Element;
}

export const routes: IRoute[] = [
  {
    name: 'List Post',
    path: HOME_PATH,
    element: <ListPost />
  },
  {
    name: 'Show Post',
    path: SHOW_POST_PATH,
    element: <ShowPost />
  },
  {
    name: 'Add Post',
    path: CREATE_POST_PATH,
    element: <AddPost />
  },
  {
    name: 'Edit Post',
    path: EDIT_POST_PATH,
    element: <EditPost />
  }
];