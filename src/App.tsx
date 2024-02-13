import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/Register/Register"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const Messages = React.lazy(() => import("./pages/Messages/Messages"));
function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<div className='content'>
					<Navbar />
					<Suspense fallback={<div>loading...</div>}>
						<Routes>
							<Route index path='/' element={<Home />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/*' element={<Home />} />
							<Route path='/profile/:id' element={<Profile />} />
							<Route path='/messages' element={<Messages />}></Route>
						</Routes>
					</Suspense>
					<Footer />
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
