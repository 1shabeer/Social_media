import About from "./Components/About";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Missing from "./Components/Missing";
import Nav from "./Components/Nav";
import Newpost from "./Components/Newpost";
import Postpage from "./Components/Postpage";
import EditPost from './Components/EditPost'
import { Routes, Route } from "react-router-dom";
import { Dataprovider } from "./context/DataContext";

function App() {
  return (
    <div className="App">
      <Dataprovider>
        <Header title={"Shabeer Social Media"} />

        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="post">

          <Route index element={<Newpost />} />
          <Route path=":id" element={<Postpage />} />

        </Route>

          <Route path="/edit/:id" element={<EditPost />} />

          <Route path="about" element={<About />} />

          <Route path="*" element={<Missing />} />

        </Routes>

        <Footer />
      </Dataprovider>
    </div>
  );
}

export default App;
