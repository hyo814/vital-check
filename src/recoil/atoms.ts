import { atom } from 'recoil';

export const patientsState = atom({
	key: 'patientsState',
	default: [],
});

export const orderState = atom({
	key: 'orderState',
	default: 'none',
});

export const orderByState = atom({
	key: 'orderByState',
	default: '',
});

export const filterStatusState = atom({
	key: 'filterStatusState',
	default: [],
});
