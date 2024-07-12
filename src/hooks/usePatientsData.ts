import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { patientsState } from '../recoil/atoms';
import { useInfiniteQuery } from 'react-query';
import { fetchPatients } from '../api/api';

const usePatientsData = () => {
	const [patients, setPatients] = useRecoilState(patientsState);
	const observer = useRef<IntersectionObserver | null>(null);
	
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		isLoading
	} = useInfiniteQuery('patients', fetchPatients, {
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length === 5 ? pages.length + 1 : undefined;
		}
	});
	
	const lastPatientRef = useCallback((node: HTMLTableRowElement | null) => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage();
			}
		});
		if (node) observer.current.observe(node);
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);
	
	useEffect(() => {
		if (data) {
			const newPatients = data.pages.flat();
			setPatients(newPatients);
		}
	}, [data, setPatients]);
	
	const handleResetSort = () => {
		setPatients([]);
		refetch();
	};
	
	return {
		patients,
		lastPatientRef,
		handleResetSort,
		isLoading,
		isFetchingNextPage
	};
};

export default usePatientsData;
