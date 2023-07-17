import { useState, useEffect } from 'react';

export interface useFetchProps {
	url: string;
	method?: string;
	body?: any;
	headers?: any;
}

export const useFetch = ({
	url,
	method = 'GET',
	headers = {},
}: useFetchProps) => {
	const [data, setData] = useState<any>([]);
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [controller, setController] = useState<AbortController | null>(null);
	const [bodyRequest, setBodyRequest] = useState<any>([]);
    const [methodState, setMethodState] = useState<string>(method);
    const [urlState, setUrlState] = useState<string>(url);

	useEffect(() => {
		setError(null)
		console.log(urlState, 'Is here')
		console.log(bodyRequest, 'Is here')
		console.log(methodState, 'Is here')
		const abortController: any = new AbortController();
		// const dataSended = JSON.stringify(bodyRequest)
		setController(abortController);
		setLoading(true);
		if (methodState == 'GET') {
			fetch(urlState, {
				method: methodState,
				headers,
				signal: abortController.signal,
			})
				.then((response) => response.json())
				.then((data) => {
					setData(data);
					setError(null);
					setLoading(false);
				})
				.catch((error) => {
					if (error.name !== 'AbortError') {
						setError(error);
						setLoading(false);
					}
				})
				.finally(() => setLoading(false));
		} else if (methodState == 'POST' || methodState == 'PUT' || methodState == 'DELETE') {
			fetch(urlState, {
				method: methodState,
				body: JSON.stringify(bodyRequest),
				headers,
				signal: abortController.signal,
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(urlState, 'Is here')
					console.log(methodState, 'Is here')
					console.log(error, 'Is here')
					console.log(bodyRequest, 'Is here')
					setData(data);
					setError(null);
					setLoading(false);
					// console.log(data, 'Is here')
				})
				.catch((error) => {
					if (error.name !== 'AbortError') {
						setError(error);
						setLoading(false);
					}
				})
				.finally(() => setLoading(false));
		}
		return () => abortController.abort();
	}, [urlState, bodyRequest]);

	const handleCancelRequest = () => {
		if (controller) {
			controller.abort();
			setError('Request aborted');
		}
	};

	return { data, error, loading, handleCancelRequest, setBodyRequest, setMethodState, setUrlState };
};
