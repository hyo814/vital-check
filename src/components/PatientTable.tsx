"use client"

import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableSortLabel,
	CircularProgress,
	Box
} from '@mui/material';
import { useRecoilState } from 'recoil';
import { orderState, orderByState, filterStatusState } from '../recoil/atoms';
import { PatientProps, Order } from '../type/type';
import { convertStatus } from '../utils/utils';
import SortIcon from "./SortIcon";
import StatusFilter from './StatusFilter';
import TableCellComponent from './TableCellComponent';
import usePatientsData from '../hooks/usePatientsData';
import { usePatientStatusCounts } from "@/src/hooks/usePatientStatusCounts";

const PatientTable: React.FC = () => {
	const { patients, lastPatientRef, handleResetSort, isLoading, isFetchingNextPage } = usePatientsData();
	const [order, setOrder] = useRecoilState(orderState);
	const [orderBy, setOrderBy] = useRecoilState(orderByState);
	const [filterStatus, setFilterStatus] = useRecoilState(filterStatusState);
	const statusCounts = usePatientStatusCounts(patients);
	
	const handleStatusChange = (status: string) => {
		setFilterStatus((prev) =>
			prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
		);
	};
	
	const filteredPatients = patients.filter((patient) =>
		filterStatus.length === 0 || filterStatus.includes(convertStatus(patient.status))
	);
	
	const handleSort = (property: keyof PatientProps | 'alertDate') => {
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
				if (property === 'alertDate') {
					const aDate = a.alert?.date ?? '';
					const bDate = b.alert?.date ?? '';
					if (nextOrder === 'asc') {
						return aDate < bDate ? -1 : 1;
					} else if (nextOrder === 'desc') {
						return aDate > bDate ? -1 : 1;
					} else {
						return 0;
					}
				} else {
					if (nextOrder === 'asc') {
						return a[property] < b[property] ? -1 : 1;
					} else if (nextOrder === 'desc') {
						return a[property] > b[property] ? -1 : 1;
					} else {
						return 0;
					}
				}
			});
			setPatients(sortedData);
		}
	};
	
	return (
		<>
			<StatusFilter filterStatus={filterStatus} handleStatusChange={handleStatusChange} statusCounts={statusCounts}/>
			<TableContainer component={Paper} sx={{ overflow: 'auto', height: '90vh' }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} className="w-1/12">Status</TableCell>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} colSpan={3}
							           onClick={() => handleSort('name')}>
								<TableSortLabel
									active={orderBy === 'name'}
									direction={order === 'none' ? undefined : (order as 'asc' | 'desc')}
									IconComponent={() => <SortIcon orderBy={orderBy} property="name" order={order} />}
								>
									Patient Info
								</TableSortLabel>
							</TableCell>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}
							           className="border-r border-gray-300 last:border-r-0" />
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Screened Type</TableCell>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}
							           className="border-r border-gray-300 last:border-r-0" onClick={() => handleSort('alertDate')}>
								<TableSortLabel
									active={orderBy === 'alertDate'}
									direction={order === 'none' ? undefined : (order as 'asc' | 'desc')}
									IconComponent={() => <SortIcon orderBy={orderBy} property="alertDate" order={order} />}
								>
									Screened Date
								</TableSortLabel>
							</TableCell>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} onClick={() => handleSort('sbp')}>
								<TableSortLabel
									active={orderBy === 'sbp'}
									direction={order === 'none' ? undefined : (order as 'asc' | 'desc')}
									IconComponent={() => <SortIcon orderBy={orderBy} property="sbp" order={order} />}
								>
									SBP
								</TableSortLabel>
							</TableCell>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} onClick={() => handleSort('dbp')}>
								<TableSortLabel
									active={orderBy === 'dbp'}
									direction={order === 'none' ? undefined : (order as 'asc' | 'desc')}
									IconComponent={() => <SortIcon orderBy={orderBy} property="dbp" order={order} />}
								>
									DBP
								</TableSortLabel>
							</TableCell>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} onClick={() => handleSort('pr')}>
								<TableSortLabel
									active={orderBy === 'pr'}
									direction={order === 'none' ? undefined : (order as 'asc' | 'desc')}
									IconComponent={() => <SortIcon orderBy={orderBy} property="pr" order={order} />}
								>
									PR
								</TableSortLabel>
							</TableCell>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} onClick={() => handleSort('rr')}>
								<TableSortLabel
									active={orderBy === 'rr'}
									direction={order === 'none' ? undefined : (order as 'asc' | 'desc')}
									IconComponent={() => <SortIcon orderBy={orderBy} property="rr" order={order} />}
								>
									RR
								</TableSortLabel>
							</TableCell>
							<TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }} onClick={() => handleSort('bt')}>
								<TableSortLabel
									active={orderBy === 'bt'}
									direction={order === 'none' ? undefined : (order as 'asc' | 'desc')}
									IconComponent={() => <SortIcon orderBy={orderBy} property="bt" order={order} />}
								>
									BT
								</TableSortLabel>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell colSpan={12} sx={{ textAlign: 'center' }}>
									<CircularProgress />
								</TableCell>
							</TableRow>
						) : (
							filteredPatients.map((patient, index) => (
								<React.Fragment key={index}>
									<TableCellComponent
										patient={patient}
										lastPatientRef={lastPatientRef}
										isLast={filteredPatients.length === index + 1}
									/>
								</React.Fragment>
							))
						)}
						{isFetchingNextPage && (
							<TableRow>
								<TableCell colSpan={12} sx={{ textAlign: 'center' }}>
									<CircularProgress />
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default PatientTable;
