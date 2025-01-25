import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Register from "./component/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Tracuu from "./pages/Tracuu";
import Phodiem from "./pages/Phodiem";
import News from "./pages/News";
import NewsList from "./pages/NewsList";
import NewsDetails from "./pages/NewsDetails";
import MyComponent from "./json/Mycomponent";
import Profile from "./pages/Profile";
import Baucua from "./pages/Baucua";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import QuizStart from "./pages/QuizStart";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Room from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="home" element={<Home />}></Route>
        <Route path="mycomponent" element={<MyComponent />}></Route>
        <Route path="settings" element={<Profile />}></Route>

        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="*" element={<About />}></Route>
        <Route path="tracuu" element={<Tracuu />}></Route>
        <Route path="phodiem" element={<Phodiem />}></Route>
        <Route path="news" element={<News />}></Route>
        <Route path="newslist" element={<NewsList />}></Route>

        <Route path="documents/:id" element={<NewsDetails />}></Route>
        <Route path="baucua" element={<Baucua />}></Route>

        <Route path="quiz" element={<Quiz />}></Route>
        <Route path="kahootquiz" element={<QuizStart />}></Route>

        <Route path="ranking" element={<Leaderboard />}></Route>
        <Route path="contact" element={<Contact />}></Route>

        <Route path="room" element={<Room />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
