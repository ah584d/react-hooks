import debounce from 'lodash.debounce';
import { useCallback, useEffect, useRef } from 'react';

type ActionDB = (signal?: AbortSignal) => void;

export function useDebounceRequest(action: ActionDB, delay: number) {
	const abortControllerRef = useRef<AbortController | null>(null);

	const debouncedAction = useRef(
		debounce(() => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
			const controller = new AbortController();
			abortControllerRef.current = controller;

			action(controller.signal);
		}, delay),
	).current;

	const trigger = useCallback(() => {
		debouncedAction();
	}, [debouncedAction]);

	useEffect(() => {
		return () => {
			debouncedAction.cancel();
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [debouncedAction]);

	return { trigger };
}

// React query hook 

export const useReactQuerySomeHook = (
	param1?: string,
	param2?: string,
): UseQueryResult<Dto, ApiError> => {
	return useQuery({
		queryKey: ['someKey', `${param1}-${param2}`],
		queryFn: async ({ signal }) => {
			return fetchMyData(param1, param2, signal);
		},
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		enabled: false, // Disabled by default - query is manually triggered when user clicks the load table button
	});
};

const { data, refetch } = useReactQuerySomeHook(params...);

const { trigger: debouncedRefetch } = useDebounceRequest(() => refetch(), 3000);
