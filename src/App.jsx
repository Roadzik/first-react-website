import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Messages from "./pages/Messages/Messages";
function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<div className='content'>
					<Navbar />
					<Routes>
						<Route index path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/*' element={<Home />} />
						<Route path='/profile/:id' element={<Profile />} />
						<Route path='/messages' element={<Messages />}></Route>
					</Routes>
					<Footer />
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
