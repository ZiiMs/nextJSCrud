import { createContext } from 'react';

const fns: any = {};
const add = (name: string, fn: any) => {
	fns[name] = fn;
};
const dispatch = (name: string, n: any) => {
	fns[name] && fns[name](n);
};

const PostContext = createContext({ add, dispatch });

export default PostContext;
