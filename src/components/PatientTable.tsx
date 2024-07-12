import React, { useCallback, useRef, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableSortLabel
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { patientsState, orderState, orderByState, filterStatusState } from '../recoil/atoms';
import { useInfiniteQuery } from 'react-query';
import { fetchPatients } from '../api/api';
import { PatientProps, Order } from '../types/type';
import { convertStatus } from '../utils/utils';
import SortIcon from "./SortIcon";
import StatusFilter from './StatusFilter';
import TableCellComponent from './TableCellComponent';

interface PatientTableProps {
	lastPatientRef: (node: any) => void;
	statusCounts: { [key: string]: number };
	handleResetSort: () => void;
}

const PatientTable: React.FC<PatientTableProps> = ({ lastPatientRef, statusCounts, handleResetSort }) => {
	const [patients, setPatients] = useRecoilState(patientsState);
	const [order, setOrder] = useRecoilState(orderState);
	const [orderBy, setOrderBy] = useRecoilState(orderByState);
	const [filterStatus, setFilterStatus] = useRecoilState(filterStatusState);
	
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
	
	const lastPatientObserver = useCallback((node) => {
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
	
	const handleStatusChange = (status: string) => {
		setFilterStatus((prev) =>
			prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
		);
	};
	
	const filteredPatients = patients.filter((patient) =>
		filterStatus.length === 0 || filterStatus.includes(convertStatus(patient.status))
	);
	
	const handleSort = (property: keyof PatientProps) => {
		let nextOrder: Order = 'asc';
		if (orderBy === property) {
			if (order === 'asc') {
				nextOrder = 'desc';
			} else if (order === 'desc') {
				nextOrder = 'none';
			} else {
				nextOrder = 'asc';
			}
		}
		setOrder(nextOrder);
		setOrderBy(property);
		
		if (nextOrder === 'none') {
			handleResetSort();
		} else {
			const sortedData = [...patients].sort((a, b) => {
				if (nextOrder === 'asc') {
					return a[property] < b[property] ? -1 : 1;
				} else if (nextOrder === 'desc') {
					return a[property] > b[property] ? -1 : 1;
				} else {
					return 0;
				}
			});
			setPatients(sortedData);
		}
	};
	
	return (
		<TableContainer component={Paper} style={{overflow: 'auto'}}>
			<StatusFilter filterStatus={filterStatus} handleStatusChange={handleStatusChange} statusCounts={statusCounts} />
			<Table stickyHeader>
				<TableHead>
					<TableRow>
						<TableCell className="w-1/12">Status</TableCell>
						<TableCell onClick={() => handleSort('name')}>
							<TableSortLabel
								active={orderBy === 'name'}
								direction={order === 'none' ? 'asc' : order}
								IconComponent={() => <SortIcon orderBy={orderBy} property="name" order={order} />}
							>
								Patient Info
							</TableSortLabel>
						</TableCell>
						<TableCell/>
						<TableCell/>
						<TableCell className="border-r border-gray-300 last:border-r-0"/>
						<TableCell>Screened Type</TableCell>
						<TableCell className="border-r border-gray-300 last:border-r-0" onClick={() => handleSort('alert.date')}>
							<TableSortLabel
								active={orderBy === 'alert.date'}
								direction={order === 'none' ? 'asc' : order}
								IconComponent={() => <SortIcon orderBy={orderBy} property="alert.date" order={order} />}
							>
								Screened Date
							</TableSortLabel>
						</TableCell>
						<TableCell onClick={() => handleSort('sbp')}>
							<TableSortLabel
								active={orderBy === 'sbp'}
								direction={order === 'none' ? 'asc' : order}
								IconComponent={() => <SortIcon orderBy={orderBy} property="sbp" order={order} />}
							>
								SBP
							</TableSortLabel>
						</TableCell>
						<TableCell onClick={() => handleSort('dbp')}>
							<TableSortLabel
								active={orderBy === 'dbp'}
								direction={order === 'none' ? 'asc' : order}
								IconComponent={() => <SortIcon orderBy={orderBy} property="dbp" order={order} />}
							>
								DBP
							</TableSortLabel>
						</TableCell>
						<TableCell onClick={() => handleSort('pr')}>
							<TableSortLabel
								active={orderBy === 'pr'}
								direction={order === 'none' ? 'asc' : order}
								IconComponent={() => <SortIcon orderBy={orderBy} property="pr" order={order} />}
							>
								PR
							</TableSortLabel>
						</TableCell>
						<TableCell onClick={() => handleSort('rr')}>
							<TableSortLabel
								active={orderBy === 'rr'}
								direction={order === 'none' ? 'asc' : order}
								IconComponent={() => <SortIcon orderBy={orderBy} property="rr" order={order} />}
							>
								RR
							</TableSortLabel>
						</TableCell>
						<TableCell onClick={() => handleSort('bt')}>
							<TableSortLabel
								active={orderBy === 'bt'}
								direction={order === 'none' ? 'asc' : order}
								IconComponent={() => <SortIcon orderBy={orderBy} property="bt" order={order} />}
							>
								BT
							</TableSortLabel>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredPatients.map((patient, index) =>
						<TableCellComponent patient={patient} lastPatientRef={lastPatientObserver} isLast={filteredPatients.length === index + 1} />
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PatientTable;
