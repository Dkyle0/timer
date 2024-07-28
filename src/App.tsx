import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Timers } from './components/timers/temers';
import { AddTimer } from './components/timers/add-timer/add-timer';
import { Timer } from './components/timers/timer/timer';

export function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Timers />} />
				<Route path="/timers/" element={<Timers />} />
				<Route path="/timers/add" element={<AddTimer />} />
				<Route path="/timers/edit" element={<Timers />} />
				<Route path="/timer/:id" element={<Timer />} />
				<Route path="/*" element={<h1>Такой страницы не сущесивует</h1>} />
			</Routes>
		</div>
	);
}
