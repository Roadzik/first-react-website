import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
function App() {
	return (
		<div className='App'>
			<Navbar />
			<BrowserRouter>
				<div className='content'>
					<Routes>
						<Route index path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
