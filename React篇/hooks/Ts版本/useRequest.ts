// useRequest 用于发送请求
import axios, { AxiosRequestConfig } from 'axios';
import { useState, useCallback } from 'react';

interface Response<T extends []> {
	data: T | null;
	status: Status;
	error: Error | null;
}

type Status = 'idle' | 'pending' | 'success' | 'error';

export function useRequest(initialConfig: AxiosRequestConfig) {
	const [config, setConfig] = useState(initialConfig);
	const [{ data, status, error }, setState] = useState<Response<[]>>({
		data: null, // 请求结果
		status: 'idle', // 请求状态
		error: null, // 错误信息
	});

	const request = useCallback(() => {
		setState({ data: null, status: 'idle', error: null });

		axios
			.request(config)
			.then((response) => setState({ data: response.data, status: 'success', error: null }))
			.catch((error) => setState({ data: null, status: 'success', error: error }));
	}, [config]);

	useEffect(() => request(), [request]);

	return [data, status, error, config, setConfig];
}

// ----------------------------- Use ----------------------------------
/* 
import React from "react";
import useRequest from "./useRequest";

function App() {
  const { status, data, error, setConfig } = useRequest({
    url: "https://jsonplaceholder.typicode.com/todos/1",
  });

  let jsx;
  if (status === "idle") jsx = null;
  if (status === "pending") jsx = <div>加载中...</div>;
  if (status === "error") jsx = <div>{error}</div>;
  if (status === "success") jsx = <div>{JSON.stringify(data)}</div>;

  // 用于修改请求参数 重新获取数据的方法
  const onRequest = () => {
    // 随机生成 1 - 100 之间的数值作为 id
    const id = Math.ceil(Math.random() * 100);
    // 更新请求参数
    setConfig({ url: `https://jsonplaceholder.typicode.com/todos/${id}` });
  };

  return (
    <>
      <button onClick={onRequest}>button</button>
      {jsx}
    </>
  );
}

export default App;
*/
