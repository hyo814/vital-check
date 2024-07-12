"use client";

import { useEffect, useRef, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { patientsState, orderState, orderByState, filterStatusState } from '../recoil/atoms';
import { useInfiniteQuery } from 'react-query';
import { fetchPatients } from '../api/api';
import PatientTable from '../components/PatientTable';
import { usePatientStatusCounts } from "@/src/hooks/usePatientStatusCounts";

const Home = () => {
	const [patients, setPatients] = useRecoilState(patientsState);
	const setOrder = useSetRecoilState(orderState);
	const setOrderBy = useSetRecoilState(orderByState);
	const observer = useRef<IntersectionObserver | null>(null);
	
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch
	} = useInfiniteQuery('patients', fetchPatients, {
		getNextPageParam: (lastPage, pages) => {
			return lastPage.length ? pages.length + 1 : undefined;
		}
	});
	
	const lastPatientRef = useCallback((node) => {
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
			setPatients((prevPatients) => [...prevPatients, ...newPatients]);
		}
	}, [data, setPatients]);
	
	const handleResetSort = () => {
		setOrder('none');
		setOrderBy('');
		refetch();
	};
	
	const statusCounts = usePatientStatusCounts(patients);
	
	return (
		<PatientTable
			lastPatientRef={lastPatientRef}
			statusCounts={statusCounts}
			handleResetSort={handleResetSort}
		/>
	);
};

export default Home;
